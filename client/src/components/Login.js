import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login as LoginService } from '../middleware/index';
import { saveUser } from '../actions/actions';
import history from '../util/history';
import { isEmpty } from '../util';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }
    onClickSend() {
        if (this.state.username === '' || this.state.password === '') {
            alert('Valmelyik field üres!');
        } else {
            const user = {
                username: this.state.username,
                password: this.state.password
            };

            LoginService.sendCredentials(user).then(data => {
                if (!isEmpty(data)) {
                    this.props.SaveUser(data);
                    history.push('/kerdoiv-keszites');
                    return;
                }
                this.setState({
                    username: '',
                    password: '',
                    error: 'Hibás felhasználónév/jelszó!'
                });
            });
        }
    }
    inputChange(type, event) {
        this.setState({ [type]: event.target.value });
    }
    render() {
        return (
            <div className="container">
                <div className="row login-form">
                    <div className="col-md-6 offset-md-3">
                        <div className="login card">
                            <div className="form-group">
                                <label>Felhasználónév</label>
                                <input
                                    type="text"
                                    value={this.state.username}
                                    placeholder="Felhasználónév..."
                                    onChange={e =>
                                        this.inputChange('username', e)
                                    }
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label>Jelszó</label>
                                <input
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Jelszó..."
                                    className="form-control"
                                    onChange={e =>
                                        this.inputChange('password', e)
                                    }
                                />
                            </div>
                            <div className="login-errorbox">
                                {this.state.error}
                            </div>
                            <div className="button-bar">
                                <button
                                    onClick={() => this.onClickSend()}
                                    className="btn btn-success login-button"
                                >
                                    Bejelentkezés
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const MapDisPatchToProps = dispatch => ({
    SaveUser: data => dispatch(saveUser(data))
});
export default connect(null, MapDisPatchToProps)(Login);
