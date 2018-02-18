import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Topbar extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: true,
            errorMsg: '',
            error: false
        }
    }

    logout(){
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return <div className="cpanel__top">
            {this.state.error ? <div className="error">
                {this.state.errorMsg}
              </div> : null}
            <h2 className="cpanel__top__title">Ezell Frazier</h2>
            <ul className="cpanel__top__options">
              <li className="cpanel__top__item">
                <Link to="/controlpanel/newpost" className="cpanel__top__link">
                  New Post
                </Link>
              </li>
              <li className="cpanel__top__item">
                <a href="#logout" className="cpanel__top__link" onClick={event => this.logout()}>
                  Logout
                </a>
              </li>
              <li className="cpanel__top__item">
                <a href="#account" className="cpanel__top__link">
                  Account
                </a>
              </li>
            </ul>
          </div>;
    }
}

export default withRouter(Topbar);