import React from 'react';
import styled, { keyframes } from 'styled-components';
import FadeIn from 'react-fade-in';

const Rending = () => {
  return (
    <Container>
      <MainLogo alt="logo" src="/images/logo.png"></MainLogo>
      <FadeIn delay={600} transitionDuration={1000}>
        <SubLogo alt="sublogo" src="/images/우리는.png"></SubLogo>
        <SubLogo alt="sublogo" src="/images/기록합니다.png"></SubLogo>
      </FadeIn>
      <LoginImg alt="loginimg" src="/images/login.png"></LoginImg>
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
