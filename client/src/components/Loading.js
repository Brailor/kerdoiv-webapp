import React from 'react';

const Loading = props => {
  return (
    <div className="landing-page">
      <div className="card card-404">
        <h1>Töltés</h1>
        <p>A keresett oldal tartalma töltődik...</p>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Loading;
