import React, { Component } from 'react';
import Jumbotron from './Jumbotron';
import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';
import loading from '../icons/loading.svg';
import $ from 'jquery';

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      isLoading: true,
    };
  }
  componentWillMount() {
    $.ajax({ type: 'GET', url: 'http://localhost:1337/post' })
      .done(post => {
        this.setState({ entries: post, isLoading: false });
      })
      .fail(function(error) {
        console.log('An error occurred:', error);
      });
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <span>
          <img src={loading} alt="loading icon" className="loading" />
        </span>
      );
    } else {
      return (
        <div className="main-site">
          <Navbar />
          <Jumbotron posts={this.state.entries} />
          <Body posts={this.state.entries} />
          <Footer />
        </div>
      );
    }
  }
}
