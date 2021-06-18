import React, { useState } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import Modal from '../components/Modal/Modal';
import LoginModal from '../pages/LoginModal';
import SignInModal from '../pages/SignInModal';

const Rending = () => {
  const [isOn, setIsOn] = useState(false);

  const handleModal = e => {
    const clickedInside = e.target.closest('.modal');
    const clickedBtn = e.target.closest('.closeBtn');

    if (clickedInside) {
      if (clickedBtn) {
        setIsOn(false);
      }
      if (!clickedBtn) {
        return;
      }
    } else {
      setIsOn(false);
    }
  };

  return (
    <Container>
      {isOn && (
        <Modal setOff={handleModal} height="800px">
          <SignInModal />
        </Modal>
      )}
      <MainLogo alt="logo" src="/images/logo.png"></MainLogo>
      <FadeIn delay={600} transitionDuration={1000}>
        <SubLogo alt="sublogo" src="/images/우리는.png" />
        <SubLogo alt="sublogo" src="/images/기록합니다.png" />
      </FadeIn>
      <LoginImg
        onClick={() => setIsOn(!isOn)}
        alt="loginimg"
        src="/images/login.png"
      ></LoginImg>
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
  width: 330px;
  padding-right: 50px;
  right: 10px;
`;

const SubLogo = styled.img``;

const LoginImg = styled.img`
  position: absolute;
  width: 70px;
  top: 10px;
  right: 30px;
  cursor: pointer;
`;
