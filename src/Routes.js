import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from '../src/components/Navbar';
import Rending from './pages/Rending';

export default function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Rending}></Route>
      </Switch>
    </Router>
  );
}
