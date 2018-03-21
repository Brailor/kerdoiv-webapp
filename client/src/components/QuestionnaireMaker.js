import React, { Component } from 'react';
import { Questionnaire } from '../middleware/index';
import { Link } from 'react-router-dom';
import history from '../util/history';

class QuestionnaireMaker extends Component {
    state = {
        qList: null
    };
    async componentDidMount() {
        const qList = await Questionnaire.getAll();

        this.setState({ qList });
    }
    render() {
        const { qList } = this.state;
        console.log(qList);
        return (
            <div className="subjects-landing-page">
                <div>
                    <span>Kérdőív készítő</span>
                    <button
                        onClick={() => history.replace('/kerdoiv-form')}
                        className="btn btn-sm btn-success"
                    >
                        +
                    </button>
                </div>
                <div className="row">
                    {qList
                        ? qList.questionnaires.map((questionnaire, index) => {
                              return (
                                  <div className="col-sm-3">
                                      <div className="card">
                                          <h1>
                                              Kérdőív címe:{' '}
                                              {questionnaire.title}
                                          </h1>
                                          <p>
                                              Kérdőív leírása:{' '}
                                              {questionnaire.description}
                                          </p>
                                          <p>Készítő: {questionnaire.madeBy}</p>
                                          <p>
                                              Szavazatok száma:{' '}
                                              {questionnaire.voteCount}
                                          </p>
                                          <Link
                                              to={`/kerdoiv/${
                                                  questionnaire._id
                                              }`}
                                              className="btn btn-success"
                                          >
                                              Megtekintés
                                          </Link>
                                      </div>
                                  </div>
                              );
                          })
                        : 'Még nincs kérdőív!'}
                </div>
            </div>
        );
    }
}

export default QuestionnaireMaker;
