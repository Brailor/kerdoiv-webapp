import React, { Component } from 'react';
import { Questionnaire } from '../middleware/index';
import { Link } from 'react-router-dom';
import Card from './Questionnaire/Card';
import Loading from './Loading';
import history from '../util/history';
import Button from './Button/Button';

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
      return <Loading />;
    }
    return (
      <div className="subjects-landing-page">
        <div>
          <Button handler={() => history.replace('/kerdoiv-form')}>
            <button className="btn btn-sm btn-success">
              <i className="fas fa-plus" /> Kérdőív készítése
            </button>
          </Button>
        </div>
        <div className="row">
          {qList.questionnaires.length !== 0 ? (
            qList.questionnaires.map(this.renderQuestionnaireCard)
          ) : (
            <div>
              <p>Még nincs kérdőíved, kattints a "kérdőív készítése" gombra, ha szeretnél létrehozni egyet!</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default QuestionnaireMaker;
