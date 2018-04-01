import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Questionnaire } from '../../middleware/index';
import Loading from '../Loading';
import Card from './Card';

export class List extends Component {
  state = {
    qList: null
  };

  renderQuestionnaireCard(questionnaire, index) {
    return <Card questionnaire={questionnaire} key={index} />;
  }

  async componentDidMount() {
    const { subject } = this.props.match.params || {};
    if (subject) {
      const result = await Questionnaire.getBySubject(subject);
      this.setState({ qList: result });
    }
  }

  render() {
    const { qList } = this.state;
    if (!qList) {
      return <Loading />;
    }

    return (
      <div className="subjects-landing-page">
        <div className="row">
          {qList.length !== 0 ? qList.map(this.renderQuestionnaireCard) : <div>Nincs ilyen típusú kérdőív!</div>}
        </div>
      </div>
    );
  }
}
