import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Questionnaire } from '../middleware/index';
import { saveQuestionnaires } from '../actions/actions';

class QuestionnaireMakerMain extends Component {
    componentDidMount() {
        Questionnaire.getAll().then(this.props.saveQuestionnaires);
        console.log(this.props);
    }
    makeQuestionnaire(item, ind) {
        return (
            <div key={ind} className="card text-center">
                <div className="card-header">
                    <span className="card-title">{item.title}</span>
                </div>
                <div className="card-block">
                    <h6 className="card-subtitle mb-2 text-muted">
                        Készítette: {item.madeBy.name}
                    </h6>
                    <p className="card-text">{item.description}</p>
                    <Link to={`kerdoiv/${item.id}`} className="btn btn-primary">
                        Kérdőiv megtekinése
                    </Link>
                </div>
                <div className="card-footer">
                    <p className="card-text">
                        Kitöltések száma: {item.voteCount}
                    </p>
                </div>
            </div>
        );
    }

    render() {
        const { questionnaires } = this.props;

        if (questionnaires && questionnaires.length <= 0) {
            return (
                <div className="card">
                    <div className="card-body">
                        Még nincs kérdőíved, kattints a '+' gombra kérdőív
                        készítéséhez.
                    </div>
                </div>
            );
        }
        return (
            <div className="row">
                <div className="col-sm-4">
                    {questionnaires
                        ? questionnaires.map((questionnaire, ind) =>
                              this.makeQuestionnaire(questionnaire, ind)
                          )
                        : ''}
                </div>
            </div>
        );
    }
}

const MapDispatchToProps = dispatch => ({
    saveQuestionnaires: questionnaires =>
        dispatch(saveQuestionnaires(questionnaires))
});

const MapStateToProps = state => ({
    questionnaires: []
});

export default connect(MapStateToProps, MapDispatchToProps)(
    QuestionnaireMakerMain
);
