import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from '../util';

class Navbar extends Component {
    makeNavItems() {
        const auth = this.props.auth;
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>
                            Belépés
                        </Link>
                    </li>
                );
            default:
                return [
                    <li key={0} className="nav-item">
                        <Link className="nav-link" to={'/kerdoiv-keszites'}>
                            Kérdőív Készítése
                        </Link>
                    </li>,
                    <li key={1} className="nav-item">
                        <Link className="nav-link" to={'/tema-lista'}>
                            Téma Lista
                        </Link>
                    </li>,
                    <li key={2} className="nav-item">
                        <a className="nav-link" href="/api/logout">
                            Kilépés
                        </a>
                    </li>
                ];
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a
                    className="navbar-brand"
                    href={this.props.auth ? '/#/tema-lista' : '/'}
                >
                    Kérdőív készítő
                </a>
                <ul className="navbar-nav ml-auto">{this.makeNavItems()}</ul>
            </nav>
        );
    }
}

const MapStateToProps = ({ auth }) => ({
    auth
});

export default connect(MapStateToProps)(Navbar);
