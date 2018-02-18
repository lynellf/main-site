import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
// import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMsg: '',
      name: '',
      userName: '',
      email: '',
      password: '',
      confirm: '',
    };
    this.dataCheckandSubmit = this.dataCheckandSubmit.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateConfirm = this.updateConfirm.bind(this);
  }

  updateName = event => this.setState({ name: event.target.value });
  updateUserName = event => this.setState({ userName: event.target.value });
  updateEmail = event => this.setState({ email: event.target.value });
  updatePassword = event => this.setState({ password: event.target.value });
  updateConfirm = event => this.setState({ confirm: event.target.value });

  dataCheckandSubmit = (event, userObject) => {
    console.log(userObject);
    // Validate password
    if (
      userObject.password === userObject.confirm &&
      userObject.password.length !== 0 &&
      userObject.password.length >= 8
    ) {
      this.registerUser(userObject);
      event.preventDefault();
    } else if (userObject.password.length < 8) {
      this.setState({
        error: true,
        errorMsg: 'Password must be greater than 8 characters.',
        userData: userObject,
      });

      event.preventDefault();
    } else if (userObject.password.length === 0) {
      this.setState({
        error: true,
        errorMsg: 'Please enter a password to continue registration.',
        userData: userObject,
      });

      event.preventDefault();
    } else {
      this.setState({
        error: true,
        errorMsg: 'Passwords do not match.',
        userData: userObject,
      });

      event.preventDefault();
    }
  };

  registerUser(userData) {
    $.ajax({
      type: 'POST',
      url: '/api/auth/local/register',
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        name: userData.name,
      },
    })
      .done(function(auth) {
        console.log('Well done!');
        console.log('User profile', auth.user);
        console.log('User token', auth.jwt);
      })
      .fail(function(error) {
        console.log('An error occurred:', error);
      });
  }

  render() {
    const userData = {
      name: this.state.name,
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      confirm: this.state.confirm,
    };
    return (
      <div className="register">
        <form
          className="register__form"
          onSubmit={event => this.dataCheckandSubmit(event, userData)}
        >
          {this.state.error ? (
            <div className="error">{this.state.errorMsg}</div>
          ) : null}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.updateName(event)}
          />
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="userName"
            placeholder="User Name"
            value={this.state.userName}
            onChange={event => this.updateUserName(event)}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={event => this.updateEmail(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={this.state.password}
            onChange={event => this.updatePassword(event)}
          />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Password"
            value={this.state.confirm}
            onChange={event => this.updateConfirm(event)}
          />
          <input type="submit" value="Register Account" />
        </form>
      </div>
    );
  }
}
export default withRouter(Register);
