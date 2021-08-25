import React, { useState } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import SignIn from './SignIn';
import GoogleLogin from './GoogleLogin';

export default function Rending() {
  const [hasUserData, setHasUserData] = useState(true);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {hasUserData ? (
          <LeftArea>
            <MainLogo>We Record</MainLogo>
            <FadeIn delay={600} transitionDuration={1000}>
              <SubLogo className="top">우리는</SubLogo>
              <SubLogo className="bottom">기록합니다.</SubLogo>
            </FadeIn>
            <GoogleLogin setHasUserData={setHasUserData} />
          </LeftArea>
        ) : (
          <LeftArea>
            <MainLogo>추가 정보를 입력해주세요</MainLogo>
            <SignIn />
          </LeftArea>
        )}
        <RightImg alt="rendingImg" src="/images/rending/rending.png" />
      </Container>
    </FadeIn>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width: 1040px;
  height: calc(100vh - 100px);
  margin: 0 auto;

  ${({ theme }) => theme.tablet`
    max-width: 840px;
  `}

  ${({ theme }) => theme.mobile`
    ${({ theme }) => theme.flexbox('column')};
    padding: 0 20px;
  `}
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};

  .top {
    margin-top: 20px;
  }

  .bottom {
    margin-top: 10px;
  }
`;

const MainLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(32)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.mobile`
    font-size: ${({ theme }) => theme.pixelToRem(16)};
  `}
`;

const SubLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(60)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.mobile`
    font-size: 30px;
  `}
`;

const RightImg = styled.img`
  width: 52%;

  ${({ theme }) => theme.mobile`
    position: absolute;
    width: 300px;
    opacity: 0.1;
    z-index: -1;
  `}
`;
