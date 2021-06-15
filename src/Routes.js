import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Rending from './pages/Rending';
import GoogleLogin from './pages/GoogleLogin';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Rending}></Route>
        <Route exact path="/googlelogin" component={GoogleLogin}></Route>
      </Switch>
    </Router>
  );
}
