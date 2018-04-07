import React from 'react';
import { register } from '../middleware/index';

class Register extends React.Component {
  state = {
    error: ''
  };

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onClickSend() {
    const { username = '', password = '', pass_match = '' } = this.state;
    if (!username || !password || !pass_match || pass_match !== password) {
      this.setState({ error: 'Valamilyen adat hiányzik, vagy nem egyeznek meg a jelszavak!' });
      return;
    }
    register({ username, password });
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
                  name="username"
                  onChange={e => this.inputChange(e)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Jelszó</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="Jelszó..."
                  className="form-control"
                  onChange={e => this.inputChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Jelszó megerősítése</label>
                <input
                  type="password"
                  value={this.state.pass_match}
                  name="pass_match"
                  placeholder="Jelszó..."
                  className="form-control"
                  onChange={e => this.inputChange(e)}
                />
              </div>
              <div className="login-errorbox">{this.state.error}</div>
              <div className="button-bar">
                <button onClick={() => this.onClickSend()} className="btn btn-success login-button">
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

export default Register;
