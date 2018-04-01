import React, { Component } from 'react';
import { Questionnaire as QuestionnaireSerive } from '../middleware/index';
import * as propTypes from 'prop-types';

class Questionnaire extends Component {
  static childContextTypes = {
    onChangeInput: propTypes.func.isRequired
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value }, () => console.log(this.state));
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

  render() {
    const { questionnaire } = this.state;
    if (!questionnaire) {
      return (
        <div>
          <h2>Loading....</h2>
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
    const { children } = this.props;
    const { onChangeInput } = this.context;
    const { qType } = children;
    let questionType;
    //TODO: qType alapján való question renderelés és state mentés a legfőlsőbb componensben
    switch (qType) {
      case 'radio':
        questionType = <RadioInput />;
        break;
      case 'checkbox':
        questionType = <div>Chekcbox</div>;
        break;
      case 'text':
        questionType = <div>Text</div>;
        break;
      case 'textfield':
        questionType = <div>TextField</div>;
        break;
      default:
        break;
    }
    return (
      <div className="question-input-card">
        {`${this.props.index + 1}. `}
        {children.title}
        {questionType}
      </div>
    );
  }
}

const RadioInput = props => {
  return <div>Radio </div>;
};
export default Questionnaire;
