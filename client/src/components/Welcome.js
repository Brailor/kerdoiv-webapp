import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="row no-gutters">
            <div className="col-md-8 offset-md-2">
                <div className="card">
                    <h1>Üdv az oldalon!</h1>
                </div>
            </div>
            <div className="col-md-4  offset-md-2 ">
                <div className="card">
                    <Link to={'/login'} className="btn btn-success">
                        Belépéshez kattins ide.
                    </Link>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card">
                    <Link to={'/register'} className="btn btn-info">
                        Regisztrációhoz kattins ide.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
