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
  height: calc(100vh - 200px);
  font-size: 35px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.mobile`
    font-size: 15px;
  `}
`;
