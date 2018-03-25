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

    renderQuestionnaireCard(questionnaire, index) {
        return (
            <div className="col-sm-3" key={index}>
                <div className="card">
                    <div className="card-header border-info">
                        <b> Kérdőív címe:</b> {questionnaire.title}
                    </div>
                    <div className="card-body">
                        <p>
                            <b>Kérdőív leírása:</b> {questionnaire.description}
                        </p>
                        <p>
                            <b>Készítő:</b> {questionnaire.madeBy}
                        </p>
                        <p>
                            <b>Szavazatok száma:</b> {questionnaire.voteCount}
                        </p>
                    </div>
                    <div className="card-footer border-success">
                        <Link to={`/kerdoiv/${questionnaire._id}`} className="btn btn-success btn-block">
                            Megtekintés
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        const { qList } = this.state;

        if (!qList) {
            return (
                <div className="subjects-landing-page">
                    <p>Kérdőívek töltése folyamatban...</p>
                </div>
            );
        }
        return (
            <div className="subjects-landing-page">
                <div>
                    <span>Kérdőív készítése</span>
                    <button onClick={() => history.replace('/kerdoiv-form')} className="btn btn-sm btn-success">
                        +
                    </button>
                </div>
                <div className="row">
                    {qList.questionnaires.length !== 0 ? (
                        qList.questionnaires.map(this.renderQuestionnaireCard)
                    ) : (
                        <div>
                            <p>
                                Még nincs kérdőíved, kattints a "kérdőív készítése" gombra, ha szeretnél létrehozni
                                egyet!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default QuestionnaireMaker;
