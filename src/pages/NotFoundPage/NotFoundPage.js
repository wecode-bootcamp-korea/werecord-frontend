import React from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';

export default function NotFoundPage() {
  return (
    <FadeIn transitionDuration={1000}>
      <Container>{'>'} 요청하신 페이지를 찾을 수 없습니다.</Container>
    </FadeIn>
  );
}

const Container = Styled.section`
  ${({ theme }) => theme.flexbox('row', 'center', 'center')};
  height: 100vh;
  font-size: 35px;
  font-weight: 700;

  ${({ theme }) => theme.tablet`
    font-size: 15px;
  `}
`;
