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
        <Route exact path="/googleLogin" component={GoogleLogin}></Route>
        <Route exact path="/main" component={Main}></Route>
      </Switch>
    </Router>
  );
}
