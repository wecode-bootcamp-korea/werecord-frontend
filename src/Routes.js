import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/main" component={Main}></Route>
      </Switch>
    </Router>
  );
}
