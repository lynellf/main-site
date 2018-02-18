import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './Index';
import Register from './Register';
import Login from './Login';
import Traffic from './cp/Traffic';
import Posts from './cp/Posts';
import NewPost from './cp/NewPost';
import EditPost from './cp/EditPost';
// import Notfound from './Notfound';

export const routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Index />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route exact path="/controlpanel" render={() => <Traffic />} />
        <Route path="/controlpanel/posts" render={() => <Posts />} />
        <Route path="/controlpanel/newpost" render={() => <NewPost />} />
        <Route path="/controlpanel/edit/:id" render={() => <EditPost />} />
        {/* <Notfound /> */}
      </Switch>
    </Router>
  );
};
