import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

export default function Navbar() {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {location.pathname !== '/' && (
        <Container>
          <Logo>&gt; we-record</Logo>
          <div>
            <GoToMyPageBtn>마이 페이지</GoToMyPageBtn>
            <GoToBatchBtn>기수 페이지</GoToBatchBtn>
            <LogoutBtn>로그 아웃</LogoutBtn>
          </div>
        </Container>
      )}
    </>
  );
}

const logoAnimation = keyframes`
  from {
    width: 0px;    
  }
  to{
    width: 68px;
    background-color: ${({ theme }) => theme.colors.fontColor}
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

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  padding: 12px 24px;
  width: 100%;
  top: 0;
  position: fixed;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  animation-name: ${showContainerAnimation};
  animation-duration: 1s;
  z-index: 10;
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
    background-color: #373737;
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
