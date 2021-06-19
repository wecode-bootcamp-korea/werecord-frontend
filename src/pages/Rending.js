import React from 'react';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';

const Rending = () => {
  return (
    <Container>
      <MainLogo alt="logo" src="/images/logo.png" />
      <FadeIn delay={600} transitionDuration={1000}>
        <SubLogo alt="sublogo" src="/images/우리는.png" />
        <SubLogo alt="sublogo" src="/images/기록합니다.png" />
      </FadeIn>
      <LoginImg alt="loginimg" src="/images/login.png" />
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
`;

const SubLogo = styled.img``;

const LoginImg = styled.img`
  position: absolute;
  width: 70px;
  top: 10px;
  right: 30px;
  cursor: pointer;
`;
