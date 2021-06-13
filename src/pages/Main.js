import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const day = ['일', '월', '화', '수', '목', '금', '토'];
const Main = () => {
  const [startDescription, setStartDescription] =
    useState(' 오늘도 상쾌하게 시작해볼까요?');

  const getTime = () => {
    let hour = new Date().getHours();
    hour > 12 ? (hour = `오후 ${hour - 12}`) : (hour = `오전 ${hour}`);
    return hour;
  };

  const changeStartText = () => {
    setStartDescription(
      `은 ${getTime()}시 ${new Date().getMinutes()}분에 시작하셨습니다.`
    );
  };

  return (
    <Container>
      <TimeSection>
        <TimeDescription>
          지금은 {new Date().getMonth() + 1}월 {new Date().getDate()}일
          {day[new Date().getDay()]}요일
        </TimeDescription>
        <TimeDescription>
          {getTime()}시 {new Date().getMinutes()}분 입니다.
        </TimeDescription>
      </TimeSection>
      <StartSection>
        <StudentName>이다슬님</StudentName>
        <StartTime>{startDescription}</StartTime>
      </StartSection>
      <ButtonAnimationSection>
        <ButtonSection>
          <Button onClick={changeStartText}>START</Button>
          <Button>STOP</Button>
        </ButtonSection>
        <FireAnimationSection>
          <FirewoodImg
            alt="firewoodimg"
            src="/images/firewood.png"
          ></FirewoodImg>
          <FireGif alt="firegif" src="/images/fire.gif"></FireGif>
        </FireAnimationSection>
      </ButtonAnimationSection>
    </Container>
  );
};

export default Main;

const Container = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')}
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  width: 100%;
  height: 100vh;
  margin-left: 150px;
`;

const TimeSection = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')}
`;

const TimeDescription = styled.h1`
  color: ${({ theme }) => theme.colors.fontColor};
  font-size: ${({ theme }) => theme.pixelToRem(70)};
  font-weight: 700;
`;

const StartSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'start', 'center')}
  margin-top:30px;
  font-size: ${({ theme }) => theme.pixelToRem(40)};
  font-weight: 500;
`;

const StudentName = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 8px;
`;

const StartTime = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
`;

const ButtonAnimationSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')}
  width:70vw;
  margin-top: 100px;
`;

const ButtonSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')}
  width: 40vw;
  font-size: 50px;
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.fontColor};
  cursor: pointer;
  margin-right: 20px;
`;

const FireAnimationSection = styled.div`
  ${({ theme }) => theme.flexbox()}
  position: relative;
`;

const FirewoodImg = styled.img`
  width: 120px;
  position: absolute;
`;

const FireGif = styled.img`
  position: absolute;
  width: 350px;
  bottom: -10px;
`;
