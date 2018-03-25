import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Questionnaire } from '../../middleware/index';

export class List extends Component {
    state = {};

    async componentDidMount() {
        const { subject } = this.props.match.params || {};
        if (subject) {
            const result = await Questionnaire.getBySubject(subject);
            console.log(result);
        }
    }

    render() {
        return <div>kérdőiv lista</div>;
    }
}
