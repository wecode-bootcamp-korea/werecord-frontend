import React from 'react';
import styled, { keyframes } from 'styled-components';

const logoAnimation = keyframes`
  from {
    width: 0px;    
  }
  to{
    width: 68px;
    background-color: #dedede;
  }
`;

const showContainerAnimation = keyframes`
  from {
    opacity: 0
  }
  to{
    opacity: 1
  }
`;

export default function Navbar() {
  return (
    <Container>
      <Logo>&gt; we-record</Logo>
      <div>
        <GoToMyPageBtn>마이 페이지</GoToMyPageBtn>
        <GoToBatchBtn>기수 페이지</GoToBatchBtn>
        <LogoutBtn>로그 아웃</LogoutBtn>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  padding: 12px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  animation-name: ${showContainerAnimation};
  animation-duration: 1s;
`;

const Logo = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;

  &:before {
    display: block;
    position: absolute;
    width: 68px;
    height: 30px;
    top: 3px;
    content: '';
    opacity: 0.5;
    background-color: #dedede;
    animation-name: ${logoAnimation};
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.14, 1.04, 1, 0.98);
  }
`;

const GoToMyPageBtn = styled.button`
  margin-right: 24px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #8080803b;
  }

  &:active {
    opacity: 0.5;
  }

  transition: transform 0.3s, background-color 0.3s, opacity 0.15s;
`;

const GoToBatchBtn = GoToMyPageBtn.withComponent('button');

const LogoutBtn = styled(GoToMyPageBtn.withComponent('button'))`
  margin-right: 0;
`;
