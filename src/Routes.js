import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Rending from './pages/Rending';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Rending}></Route>
      </Switch>
    </Router>
  );
}
