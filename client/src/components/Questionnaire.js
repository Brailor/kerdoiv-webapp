import React, { Component } from 'react';
import { Questionnaire as QuestionnaireSerive } from '../middleware/index';
import * as propTypes from 'prop-types';

class Questionnaire extends Component {
  static childContextTypes = {
    onChangeInput: propTypes.func.isRequired
  };

  changeInput = (event, qType) => {
    //Todo ha a checkbox fieldben bepipálunk valamit és utána kivesszük a pipát a state-ben bentmarad az előző érték
    if (qType === 'checkbox') {
      if (!this.state[event.target.name]) {
        let newState = {
          [event.target.name]: [event.target.value]
        };
        this.setState({ ...this.state, ...newState }, () => console.log(this.state));
        return;
      }
      let newCheckboxArr = Object.assign([], this.state[event.target.name]);
      if (!this.state[event.target.name].find(item => item === event.target.value)) {
        newCheckboxArr.push(event.target.value);
        this.setState({ [event.target.name]: newCheckboxArr }, () => console.log(this.state));
      }
    } else {
      this.setState({ [event.target.name]: event.target.value }, () => console.log(this.state));
    }
  };

  getChildContext() {
    return {
      onChangeInput: this.changeInput
    };
  }

  state = {
    questionnaire: null
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const questionnaire = await QuestionnaireSerive.getById(id);
      this.setState({ questionnaire });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(e.target);
  }

  render() {
    const { questionnaire } = this.state;
    if (!questionnaire) {
      return (
        <div>
          <h2>Töltés....</h2>
        </div>
      );
    }
    return (
      <div className="subjects-landing-page">
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <div className="card">
              <div className="card-header text-center">{questionnaire.title}</div>
              <div className="card-block row">
                <div className="col-sm-3">
                  <h4>Kérdőív leírása:</h4>
                </div>
                <div className="col-sm-9">
                  <p>{questionnaire.description}</p>
                </div>
              </div>
              {questionnaire.questions.map((question, ind) => (
                <Question index={ind} key={ind}>
                  {question}
                </Question>
              ))}

              <div className="card-footer text-center">
                <button onClick={() => console.log('click')} className="btn btn-success btn-block">
                  Elküldés
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Question extends Component {
  static contextTypes = {
    onChangeInput: propTypes.func.isRequired
  };
  render() {
    const { children, index } = this.props;
    const { onChangeInput } = this.context;
    const { qType } = children;
    let questionComp;

    if (qType === 'textfield') {
      questionComp = <textarea name={`${index}`} onChange={e => onChangeInput(e, qType)} rows="4" cols="50" />;
    } else if (qType === 'text') {
      questionComp = <input name={`${index}`} type="text" onChange={e => onChangeInput(e, qType)} />;
    } else {
      questionComp = children.answerOpts.map((answer, ind) => (
        <div>
          <label>{answer}</label>
          <input key={ind} name={`${index}`} type={qType} onChange={e => onChangeInput(e, qType)} value={answer} />
        </div>
      ));
    }
    return (
      <div className="question-input-card">
        {`${index + 1}. `}
        {children.title}
        {questionComp}
      </div>
    );
  }
}

export default Questionnaire;
