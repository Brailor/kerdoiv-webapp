import React, { Component } from 'react';
import { Questionnaire as QuestionnaireSerive } from '../middleware/index';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import history from '../util/history';
import * as propTypes from 'prop-types';
import Button from './Button/Button';

class Questionnaire extends Component {
  static childContextTypes = {
    onChangeInput: propTypes.func.isRequired
  };

  state = {
    questionnaire: null
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

  async componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      const questionnaire = await QuestionnaireSerive.getById(id);
      this.setState({ questionnaire });
    }
  }

  onClickSubmit() {
    if (!this.state) return;
    const keys = Object.keys(this.state);
    const answers = keys.filter(stateKey => stateKey !== 'questionnaire').map(value => this.state[value]);
    const jsonData = {
      answers,
      questionnaireID: this.state.questionnaire._id
    };

    QuestionnaireSerive.submit(jsonData)
      .then(res => {
        if (res.success) {
          history.push('/tema-lista');
        } else {
          alert(res.msg);
        }
      })
      .catch(e => console.log('valami hiba volt:', e));
  }

  render() {
    const { questionnaire } = this.state;
    if (!questionnaire) {
      return (
        <div>
          <Loading />
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
                <button onClick={() => this.onClickSubmit()} className="btn btn-success btn-block">
                  Elküldés
                </button>
              </div>
            </div>
          </div>
        </div>
        <Button>
          <Link to={'/' + this.props.backpage} className={'btn btn-warning'}>
            <i className="fas fa-arrow-left" />
            Vissza
          </Link>
        </Button>
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

    if (qType === 'textarea') {
      questionComp = (
        <textarea
          placeholder="Fejtsd ki a választ erre a kérdésre"
          className="form-control"
          name={`${index}`}
          onChange={e => onChangeInput(e, qType)}
          rows="4"
          cols="50"
        />
      );
    } else if (qType === 'text') {
      questionComp = (
        <input
          placeholder="Fejtsd ki a választ erre a kérdésre"
          name={`${index}`}
          type="text"
          onChange={e => onChangeInput(e, qType)}
          className="form-control"
        />
      );
    } else {
      questionComp = children.answerOpts.map((answer, ind) => (
        <div key={ind}>
          <input name={`${index}`} type={qType} onChange={e => onChangeInput(e, qType)} value={answer} />
          <label>{answer}</label>
        </div>
      ));
    }
    return (
      <div className="question-block card-block">
        {`${index + 1}. `}
        {children.title}
        <div className="question-submit-option">{questionComp}</div>
      </div>
    );
  }
}

export default Questionnaire;
