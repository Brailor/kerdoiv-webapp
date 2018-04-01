import React, { Component } from 'react';
import { Questionnaire as QuestionnaireSerive } from '../middleware/index';

class Questionnaire extends Component {
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
              <div className="card-block">
                <h4>Kérdőív leírása:</h4>
                <p>{questionnaire.description}</p>
                {questionnaire.questions.map((question, ind) => (
                  <div key={question.id} className="question-block">
                    <div className=" text-center">
                      {`${ind + 1}. kérdés: `}
                      <b>{question.title}</b>
                    </div>
                    <br />
                    <form className="container">
                      {question.answerOpts.map((answer, ind) => (
                        <div key={ind} className="question">
                          <input type="checkbox" value={answer.value} />
                          {answer.value}
                        </div>
                      ))}
                    </form>
                  </div>
                ))}
              </div>
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

export default Questionnaire;
