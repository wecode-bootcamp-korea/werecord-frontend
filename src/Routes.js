import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from '../src/components/Navbar';
import Rending from './pages/Rending/Rending';
import GoogleLogin from './pages/Rending/LoginSigninModal/GoogleLogin';
import Batch from './pages/Batch/Batch';
import Mypage from './pages/Mypage/Mypage';
import MentorPage from './pages/MentorPage/MentorPage';

export default function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/" component={Rending} />
        <Route exact path="/googleLogin" component={GoogleLogin} />
        <Route exact path="/batch" component={Batch} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/mentorpage" component={MentorPage} />
      </Switch>
    </Router>
  );
}
