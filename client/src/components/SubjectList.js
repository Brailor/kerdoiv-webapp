import React, { Component } from 'react';
import Questionnaire from './Questionnaire';
import { Subject } from '../middleware/index';
import { setSubjects } from '../actions/actions';
import { connect } from 'react-redux';

class SubjectList extends Component {
    constructor() {
        super();
        this.state = {
            open: null
        };
    }

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
    getItem(item, ind) {
        return (
            <div
                key={ind}
                onClick={e => this.toggleItem(ind)}
                key={ind}
                className={`card subject ${
                    this.state.open === ind ? 'open' : ''
                }`}
            >
                <div>
                    <span>{item.displayName}</span>
                    <button
                        className="btn"
                        style={{ float: 'right', cursor: 'pointer' }}
                    >
                        Tovább
                    </button>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="subjects-landing-page">
                {this.props.subjects
                    ? this.props.subjects.map((item, ind) =>
                          this.getItem(item, ind)
                      )
                    : ''}
            </div>
        );
    }
}

const MapStateToProps = ({ subjects }) => ({ subjects });

const MapDispatchToProps = dispatch => ({
    setSubjects: subjects => dispatch(setSubjects(subjects))
});

export default connect(MapStateToProps, MapDispatchToProps)(SubjectList);
