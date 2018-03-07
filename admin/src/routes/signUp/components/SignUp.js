import React from 'react';
import APPCONFIG from 'constants/Config';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import QueueAnim from 'rc-queue-anim';

import { hashHistory } from 'react-router';

import ReactMaterialUiNotifications from 'react-materialui-notifications';
import Message from 'material-ui/svg-icons/communication/message';
import { deepOrange500 } from 'material-ui/styles/colors';
import moment from 'moment';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: APPCONFIG.brand,
      dataViewModel: {
        username: '',
        password: '',
        email: ''
      }
    };
  }

  displayNotification = (title, message) => {
    console.log('OK');
    ReactMaterialUiNotifications.showNotification({
      desktop: true,
      title,
      additionalText: message,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      overflowText: 'joe@gmail.com',
      timestamp: moment().format('h:mm A')
    });
  }

  // BINDING
  handleChange = (field, event) => {
    const object = this.state.dataViewModel;
    object[field] = event.target.value;
    this.setState({ dataViewModel: object });
  }


  handleSubmit = (event) => {
    event.preventDefault();

    this.displayNotification('title', 'message');
    return;
    // const { username, password, email } = this.state.dataViewModel;

    const data = JSON.stringify(this.state.dataViewModel);

    const component = this;
    // url (required), options (optional)
    fetch('http://localhost:9000/api/register', {
      method: 'POST',
      body: data,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => response.json()).then((result) => {
      console.log(result);
      if (result.success === true) {
        // save token to sessionStorage
        // sessionStorage.setItem("token", result.token);

        // save logged in user to sessionStorage
        // sessionStorage.setItem("current-user", component.state.dataViewModel.username);

        // redirect to home
        component.displayNotification('title', 'message');
        // hashHistory.push('/login');

      } else {
        // sessionStorage.removeItem("token");
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
                    floatingLabelText="Username"
                    fullWidth
                    value={this.state.dataViewModel.username}
                    onChange={this.handleChange.bind(this, 'username')}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Email"
                    type="email"
                    fullWidth
                    value={this.state.dataViewModel.email}
                    onChange={this.handleChange.bind(this, 'email')}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    floatingLabelText="Password"
                    type="password"
                    fullWidth
                    value={this.state.dataViewModel.password}
                    onChange={this.handleChange.bind(this, 'password')}
                  />
                </div>
                <div className="divider" />
                <div className="form-group">
                  <p className="text-small">By clicking on sign up, you agree to <a href="javascript:;"><i>terms</i></a> and <a href="javascript:;"><i>privacy policy</i></a></p>
                </div>
              </fieldset>

              <div className="card-action no-border text-right">
                <a href="#/login" className="color-gray-light">Login</a>
                <RaisedButton type="submit" label="Sign Up" primary />
              </div>
            </form>
          </div>

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
          <SignUp />

        </div>
      </QueueAnim>
      <ReactMaterialUiNotifications
        desktop
        transitionName={{
          leave: 'dummy',
          leaveActive: 'fadeOut',
          appear: 'dummy',
          appearActive: 'zoomInUp'
        }}
        transitionAppear
        transitionLeave
      />
    </div>
  </div>
);

module.exports = Page;
