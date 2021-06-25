import React from 'react';
import styled from 'styled-components';
import GoogleLogin from './GoogleLogin';

const LoginModal = props => {
  return (
    <ModalContainer>
      <div>
        <MainLogo>&gt;we-record</MainLogo>
        <LogoLine></LogoLine>
        <LoginText>하루하루가 모여 내가 됩니다.</LoginText>
        <LoginText>정신없이 지나간 소중한 오늘을</LoginText>
        <LoginText>기록하며 나를 되돌아보는</LoginText>
        <LoginText>위코더가 되면 어떨까요?</LoginText>
      </div>
      <LoginSection>
        <LoginHeader>로그인하시겠어요?</LoginHeader>
        <GoogleLogin changeModalValue={props.changeModalValue} />
      </LoginSection>
    </ModalContainer>
  );
};

export default LoginModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;

  div {
    ${({ theme }) => theme.flexbox('column', 'start', 'start')};
    color: ${({ theme }) => theme.colors.black};
    margin-right: 10px;
  }
`;

const MainLogo = styled.div`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 5px;
`;

const LogoLine = styled.hr`
  width: 130px;
  margin-left: 5px;
  margin-bottom: 5px;
  background-color: red;
  text-align: center;
`;
const LoginText = styled.p`
  font-size: 13px;
  margin-bottom: 2px;
  font-weight: 700;
`;

const LoginSection = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  margin-left: 50px;
`;

const LoginHeader = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
  margin-left: 25px;
`;
