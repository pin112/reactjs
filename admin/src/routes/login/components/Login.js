import React from 'react';
import APPCONFIG from 'constants/Config';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import QueueAnim from 'rc-queue-anim';

import { hashHistory } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      dataViewModel: {
        username: '',
        password: ''
      }
    };
  }

  // BINDING
  handleChange(field, event) {
    const object = this.state.dataViewModel;
    object[field] = event.target.value;
    this.setState({ dataViewModel: object });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state.dataViewModel;

    const data = JSON.stringify(this.state.dataViewModel);

    const component = this;
    // url (required), options (optional)
    fetch('http://localhost:9000/api/authenticate', {
      method: 'POST',
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.json()).then((result) => {
      console.log(result);
      if (result.success === true) {
        // save token to sessionStorage
        sessionStorage.setItem('token', result.token);

        // save logged in user to sessionStorage
        sessionStorage.setItem('current-user', component.state.dataViewModel.username);

        // redirect to home
        hashHistory.push('/');

      } else {
        sessionStorage.removeItem('token');
      }

    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="body-inner">
        <div className="card bg-white">
          <div className="card-content">

            <section className="logo text-center">
              <h1><a href="#/">{this.state.brand}</a></h1>
            </section>

            <form onSubmit={this.handleSubmit} className="form-horizontal">
              <fieldset>
                <div className="form-group">
                  <TextField
                    name="username"
                    floatingLabelText="Username"
                    fullWidth
                    value={this.state.dataViewModel.username}
                    onChange={this.handleChange.bind(this, 'username')}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    name="password"
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    value={this.state.dataViewModel.password}
                    onChange={this.handleChange.bind(this, 'password')}
                  />
                </div>
              </fieldset>
              <div className="card-action no-border text-right">
                <RaisedButton type="submit" label="Login" primary />
              </div>
            </form>
          </div>
        </div>
        <div className="additional-info">
          <a href="#/sign-up">Sign up</a>
          <span className="divider-h" />
          <a href="#/forgot-password">Forgot your password?</a>
        </div>

      </div>
    );
  }
}

const Page = () => (
  <div className="page-login">
    <div className="main-body">
      <QueueAnim type="bottom" className="ui-animate">
        <div key="1">
          <Login />
        </div>
      </QueueAnim>
    </div>
  </div>
);

module.exports = Page;
