import React, { Component } from 'react';
import Questionnaire from './Questionnaire';
import { Link } from 'react-router-dom';
import { Subject } from '../middleware/index';
import { setSubjects } from '../actions/actions';
import { connect } from 'react-redux';
import history from '../util/history';

class SubjectList extends Component {
    componentDidMount() {
        Subject.getAll()
            .then(this.props.setSubjects)
            .catch(console.error);
    }

    toggleItem(ind) {
        if (this.state.open === ind) {
            this.setState({ open: null });
            return;
        }
        this.setState({ open: ind });
    }

    onClick(e) {
        history.push(`/kerdoiv-lista/${e.target.dataset.subject}`);
    }
    getItem(item, ind) {
        return (
            <div key={ind} key={ind} className={`col-sm-6 col-md-4`}>
                <div className="card subject">
                    <div>
                        <h2>{item.displayName}</h2>
                    </div>

                    <button data-subject={item.name} onClick={e => this.onClick(e)} className="btn btn-success">
                        Tovább
                    </button>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="subjects-landing-page">
                <div>
                    <p className="alert alert-primary text-center">
                        <span>Válassz témát!</span>
                    </p>
                </div>
                <div className="row">
                    {this.props.subjects ? this.props.subjects.map((item, ind) => this.getItem(item, ind)) : ''}
                </div>
            </div>
        );
    }
}

const MapStateToProps = ({ subjects }) => ({ subjects });

const MapDispatchToProps = dispatch => ({
    setSubjects: subjects => dispatch(setSubjects(subjects))
});

export default connect(MapStateToProps, MapDispatchToProps)(SubjectList);
