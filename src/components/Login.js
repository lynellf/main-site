import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
      loggedIn: false,
    };
  }

  updateEmail = event => this.setState({ email: event.target.value });
  updatePassword = event => this.setState({ password: event.target.value });

  dataCheckandSubmit = (event, userObject) => {
    if (userObject.password.length > 0 && userObject.email.length > 0) {
      this.loginUser(userObject);
      event.preventDefault();
    } else {
      this.setState({
        error: true,
        errorMsg:
          'One of the fields is empty. Please ensure you have provided both an email and password.',
      });
      event.preventDefault();
    }
  };

  checkLogin() {
    const token = localStorage.getItem('token');

    if(token === null) {
      this.setState({
        loggedIn: false
      })
    } else {
      this.setState({
        loggedIn: true
      });
      this.props.history.push('/controlpanel');
    }
  }

  loginUser(userData) {
    $.ajax({
      type: 'POST',
      url: '/auth/local',
      data: {
        identifier: userData.email,
        password: userData.password,
      },
    })
      .done(function(auth) {
        console.log('Well done!');
        console.log('User profile', auth.user);
        console.log('User token', auth.jwt);
        localStorage.setItem('token', auth.jwt);
      }, setTimeout(() => {
        this.props.history.push('/controlpanel')
      }, 140))
      // .done(this.props.history.push('/controlpanel'))
      .fail(function(error) {
        console.log('An error occurred:', error);
      });
  }

  componentWillMount() {
    this.checkLogin();
  }

  render() {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    return (
      <div
        className="login"
        onSubmit={event => this.dataCheckandSubmit(event, userData)}
      >
        <form className="login__form" action="/api/login">
          {this.state.error ? (
            <div className="error">{this.state.errorMsg}</div>
          ) : null}
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={event => this.updateEmail(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={event => this.updatePassword(event)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
