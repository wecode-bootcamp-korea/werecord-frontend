import React, { useState } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import Modal from '../../components/Modal/Modal';
import LoginModal from './LoginSigninModal/LoginModal';
import SignInModal from './LoginSigninModal/SignInModal';
import MadeByModal from './LoginSigninModal/MadeByModal';

const Rending = () => {
  const [isLogInModalOn, setIsLogInModalOn] = useState(false);
  const [isSignModalOn, setIsSignModalOn] = useState(false);
  const [isMadeByModalOn, setIsMadeByModalOn] = useState(false);

  const changeModalValue = () => {
    setIsSignModalOn(!isSignModalOn);
    setIsLogInModalOn(!isLogInModalOn);
  };

  return (
    <Container>
      {isLogInModalOn && (
        <Modal setOff={setIsLogInModalOn}>
          <LoginModal changeModalValue={changeModalValue} />
        </Modal>
      )}
      {isSignModalOn && (
        <Modal setOff={setIsSignModalOn}>
          <SignInModal />
        </Modal>
      )}
      {isMadeByModalOn && (
        <Modal setOff={setIsMadeByModalOn}>
          <MadeByModal />
        </Modal>
      )}
      <MainLogo alt="logo" src="/images/logo.png"></MainLogo>
      <FadeIn delay={600} transitionDuration={1000}>
        <SubLogo alt="sublogo" src="/images/우리는.png" location="top" />
        <SubLogo alt="sublogo" src="/images/기록합니다.png" location="bottom" />
      </FadeIn>
      <LoginImg
        onClick={() => setIsLogInModalOn(!isLogInModalOn)}
        alt="loginimg"
        src="/images/login.png"
      />
      <MadeByImg
        onClick={() => setIsMadeByModalOn(!isMadeByModalOn)}
        alt="madebyimg"
        src="/images/madeby.png"
      />
    </Container>
  );
};

export default Rending;

const Container = styled.section`
  ${({ theme }) => theme.flexbox()}
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('/images/mainbackground.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
`;

const MainLogo = styled.img`
  position: relative;
  padding-right: 50px;
  right: 10px;
  width: 330px;

  ${({ theme }) => theme.tablet`
    width: 150px;
    padding-right: 0;
  `}
`;

const SubLogo = styled.img`
  ${({ theme, location }) =>
    location === 'top'
      ? theme.tablet`
    width: 100px;
  `
      : theme.tablet`
  width: 135px;`}
`;

const LoginImg = styled.img`
  position: absolute;
  width: 70px;
  top: 10px;
  right: 30px;
  cursor: pointer;

  ${({ theme }) => theme.tablet`
    width: 50px;
  `}
`;

const MadeByImg = styled.img`
  position: absolute;
  width: 120px;
  top: 88%;
  cursor: pointer;

  ${({ theme }) => theme.tablet`
    width: 70px;
  `}
`;
