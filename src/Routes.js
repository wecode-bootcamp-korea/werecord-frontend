import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from '../src/components/Navbar';
import Rending from './pages/Rending';
import GoogleLogin from './pages/GoogleLogin';
// import Batch from './pages/Batch/Batch';

export default function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/" component={Rending} />
        {/* <Route exact path="/batch" component={Batch} /> */}
        <Route exact path="/googleLogin" component={GoogleLogin}></Route>
      </Switch>
    </Router>
  );
}
