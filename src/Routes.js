import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Navbar from '../src/components/Navbar';
import Rending from './pages/Rending/Rending';
import GoogleLogin from './pages/Rending/LoginSigninModal/GoogleLogin';
import Batch from './pages/Batch/Batch';
import Mypage from './pages/Mypage/Mypage';
import MentorPage from './pages/MentorPage/MentorPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Background from './components/Background/Background';
import Footer from './components/Footer/Footer';

export default function Routes() {
  return (
    <Router>
      <Navbar />
      <Background />
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/" component={Rending} />
        <Route exact path="/googleLogin" component={GoogleLogin} />
        <Route exact path="/batch/:id" component={Batch} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/mentorpage" component={MentorPage} />
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </Router>
  );
}
