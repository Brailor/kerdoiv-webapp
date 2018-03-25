import React from 'react';

const Loading = props => {
    return (
        <div className="landing-page">
            <div className="card card-404">
                <h1>Töltés</h1>
                <p>A keresett oldal tartalma töltődik...</p>
                {props.messages ? <p>{props.messages}</p> : ''}
            </div>
        </div>
    );
};

export default Loading;
