import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Topbar from './Topbar';
import Sidebar from './Sidebar';

import axios from 'axios';
import $ from 'jquery';

// import posts from '../../posts.json';

export default class Posts extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      posts: [],
      postClasses: [],
      sortedPosts: [],
      confirmation: '',
      error: false,
      errorMsg: '',
    };
    this.selectPage = this.selectPage.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost(id, arrayIndex, index) {
    const sortedPosts = this.state.sortedPosts,
      postClasses = this.state.postClasses;
    console.log(id);
    axios
      .get(`/api/delete/${id}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => this.setState({ error: true, errorMsg: error.message }));
    sortedPosts[arrayIndex].splice(index, 1);
    postClasses[arrayIndex].splice(index, 1);
    this.setState({
      sortedPosts: sortedPosts,
      postClasses: postClasses,
      confirmation: `Post id ${id} has been deleted.`,
    });
  }

  grouper(array) {
    let groups = [],
      group = [];
    // We want to push 10 posts into the group array
    for (let i = 0; i < array.length; i++) {
      group.push(array[i]);
      // When the group array length is equal to ten, we want to push it to the groups array and start over
      if (group.length === 10) {
        groups.push(group);
        group = [];
      }
    }
    // Whatever remains in the group array shall get pushed into the groups array and return the array
    groups.push(group);
    return groups;
  }

  filterPosts(postArray, classArray) {
    let classNames = classArray;
    if (postArray[0].length >= 10) {
      for (let i = 1; i < postArray.length; i++) {
        classNames[i].forEach((className, index) => {
          classNames[i][index] = 'post-list__post--inactive';
        });
      }
    } else if (postArray[0].length > 0) {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'post-list__post--inactive';
      });

      for (let i = 0; i < postArray.length; i++) {
        classNames[i].forEach((className, index) => {
          classNames[i][index] = 'post-list__post--active';
        });
      }
    } else {
      classNames[0].forEach((className, index) => {
        classNames[0][index] = 'post-list__post--inactive';
      });
    }
    this.setState({
      postClasses: classNames,
    });
  }

  selectPage(index, array) {
    let initialClasses = array;

    initialClasses.forEach(list => {
      list.forEach((item, index) => {
        list[index] = 'post-list__post--inactive';
      });
    });

    initialClasses[index].forEach((className, i) => {
      initialClasses[index][i] = 'post-list__post--active';
    });

    this.setState({
      postClasses: initialClasses,
    });
  }

  authenticateUser() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.setState({
        authenticated: false,
      });
    } else {
      $.ajax({
        type: 'GET',
        url: '/article',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .done(this.setState({ authenticated: true }))
        .fail(function(error) {
          console.log('An error occurred:', error);
        });
    }
  }

  getPosts() {
    $.ajax({
      type: 'GET',
      url: '/post',
    })
      .done(post => {
        this.setState({
          posts: post,
        });
        let posts = this.grouper(this.state.posts),
          postClasses = [];
        for (let i = 0; i < this.state.posts.length; i++) {
          postClasses.push('post-list__post--active');
        }
        postClasses = this.grouper(postClasses);
        this.setState({ sortedPosts: posts, postClasses: postClasses });
        this.filterPosts(posts, postClasses);
      })
      .fail(function(error) {
        console.log('An error occurred:', error);
      });
  }

  componentWillMount() {
    this.authenticateUser();
    this.getPosts();
  }

  render() {
    const posts = this.state.sortedPosts,
      classNames = this.state.postClasses,
      clipString = string => {
        const maxLength = 19;
        if (string.length > maxLength) {
          const words = string;
          let newString = `${words.slice(0, maxLength)}...`;
          return newString;
        } else {
          return string;
        }
      },
      pagination = posts.map((post, index) => (
        <li
          key={index}
          className="post-list__item"
          onClick={event => this.selectPage(index, classNames)}
        >
          {index + 1}
        </li>
      )),
      post = (entries, classNames) => {
        const sortedEntries = [];
        for (let i = 0; i < entries.length; i++) {
          sortedEntries.push(
            entries[i].map((post, j) => (
              <tr className={classNames[i][j]} key={post._id}>
                <td>{clipString(post.title)}</td>
                <td>{post.date}</td>
                <td>
                  <div className="post-list__buttons">
                    <span>
                      <Link to={`/controlpanel/edit/${post._id}`}>Edit</Link>
                    </span>
                    <span onClick={event => this.deletePost(post._id, i, j)}>
                      Delete
                    </span>
                  </div>
                </td>
              </tr>
            ))
          );
        }
        return sortedEntries;
      };
    if (this.state.authenticated === true) {
      return (
        <div className="cpanel">
          <Topbar />
          <Sidebar />
          <div className="cpanel__main">
            <div className="post-list">
              <h1 className="post-list__title">Projects</h1>
              <table className="post-list__table">
                <thead className="post-list__thead">
                  <tr>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>{post(posts, classNames)}</tbody>
              </table>
              <ul className="post-list__nav">{pagination}</ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="unauth">
          <h1>You are not authorized to view this page</h1>
        </div>
      );
    }
  }
}
