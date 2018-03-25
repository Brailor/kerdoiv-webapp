import React from 'react';
import { Link } from 'react-router-dom';

const Card = props => {
    return (
        <div className="col-sm-3">
            <div className="card">
                <div className="card-header border-info">
                    <b> Kérdőív címe:</b> {props.questionnaire.title}
                </div>
                <div className="card-body">
                    <p>
                        <b>Kérdőív leírása:</b> {props.questionnaire.description}
                    </p>
                    <p>
                        <b>Készítő:</b> {props.questionnaire.madeBy}
                    </p>
                    <p>
                        <b>Szavazatok száma:</b> {props.questionnaire.voteCount}
                    </p>
                </div>
                <div className="card-footer border-success">
                    <Link to={`/kerdoiv/${props.questionnaire._id}`} className="btn btn-success btn-block">
                        Megtekintés
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
