import React from 'react';
import styled from 'styled-components';

const LoginModal = () => {
  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <LoginSection>
        <LoginHeader>로그인하시겠어요?</LoginHeader>
        <GoogleLogin>구글로 로그인하기</GoogleLogin>
      </LoginSection>
    </ModalContainer>
  );
};

export default LoginModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;
`;

const MainLogo = styled.div`
  font-size: 25px;
  padding: 30px;
  font-weight: 700;

  color: ${({ theme }) => theme.colors.black};
`;

const LoginSection = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  padding: 30px;
`;

const LoginHeader = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 70px;
`;

const GoogleLogin = styled.button`
  color: ${({ theme }) => theme.colors.black};
  border: 2px solid ${({ theme }) => theme.colors.black};
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
`;
