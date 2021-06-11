import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Mypage from './pages/Mypage/Mypage';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
      </Switch>
    </Router>
  );
}
