import React from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <Container>
      <TimeDescription>지금은 6월 9일</TimeDescription>
      <TimeDescription>오후 4시 30분 입니다.</TimeDescription>
      <TimeSection>
        <StudentName>이다슬</StudentName>
        <StartTime>님은 09시 30분에 시작하셨습니다!</StartTime>
      </TimeSection>
    </Container>
  );
};

export default Main;

const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  width: 100%;
  height: 100vh;
`;
const TimeSection = styled.section``;

const TimeDescription = styled.h1`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 70px;
  font-weight: 700;
`;

const StartTime = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 40px;
  font-weight: 500;
`;

const StudentName = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: 40px;
  font-weight: 500;
  margin-top: 20px;
`;
