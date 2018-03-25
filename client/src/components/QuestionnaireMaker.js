import React, { Component } from 'react';
import { Questionnaire } from '../middleware/index';
import { Link } from 'react-router-dom';
import Card from './Questionnaire/Card';
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
        return <Card questionnaire={questionnaire} key={index} />;
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
