import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';

export default function Main({ history }) {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [userInfo, setUserInfo] = useState({
    name: '위코드',
    isOn: false,
    startTime: '09:30',
    normalAttendance: false,
  });
  const startTimeArr = userInfo.startTime.split(':');

  useEffect(() => {
    const goTime = setInterval(() => {
      setTime({
        ...time,
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
      });
    }, 1000);
    return () => clearInterval(goTime);
  }, [time]);

  useEffect(() => {
    fetch('http://10.58.6.89:8000/records')
      .then(res => res.json())
      .then(isSuccess => {
        const { user_name, user_status, user_start_time } = isSuccess.result;

        if (isSuccess.message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
          return setUserInfo({
            ...userInfo,
            normalAttendance: true,
          });
        }

        if (Object.keys(isSuccess.result).length > 0) {
          setUserInfo({
            ...userInfo,
            name: user_name,
            isOn: user_status,
            startTime: user_start_time,
          });
        }
      });
  }, []);

  const checkStart = e => {
    fetch(`http://10.58.6.89:8000/records/1`)
      .then(res => res.json())
      .then(errorMessage => {
        if (errorMessage.message === 'ALREADY_RECORD_ERROR') {
          alert('이미 출근하셨습니다.');
        }
        if (Object.keys(errorMessage.result).length > 0) {
          alert(errorMessage.result.comment);
        }
        if (errorMessage.message === 'LOCATION_ERROR') {
          alert('위코드에 오시긴 하셨나요?');
        }
        history.push('/main');
      });
  };

  const checkEnd = e => {
    fetch('http://10.58.6.89:8000/records/2')
      .then(res => res.json())
      .then(errorMessage => {
        if (errorMessage.message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
          alert('출석부터 누르세요');
        }
        if (errorMessage.message === 'ALREADY_RECORD_ERROR') {
          alert('이미 퇴근했습니다.');
        }
        if (errorMessage.message === 'LOCATION_ERROR') {
          alert('위코드에 계시긴 하나요?');
        }
        history.push('/main');
      });
  };

  return (
    <Container>
      <TimeSection>
        <TimeDescription>
          {`지금은 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 ${
            WEEK[new Date().getDay()]
          }요일`}
        </TimeDescription>
        <TimeDescription>
          {`${getTime(time.hour)}시 ${
            time.minutes !== 0 ? `${time.minutes}분` : ''
          }입니다.`}
        </TimeDescription>
      </TimeSection>
      <StartSection>
        {!userInfo.isOn ? (
          <StartTime>오늘도 상쾌하게 시작해볼까요?</StartTime>
        ) : (
          <>
            <StudentName>{userInfo.name}</StudentName>
            <StartTime>{`님은 ${startTimeArr[0]}시 ${startTimeArr[1]}분에 시작하셨습니다.`}</StartTime>
          </>
        )}
      </StartSection>
      <ButtonAnimationSection>
        <ButtonSection>
          <Button onClick={checkStart}>START</Button>
          <Button onClick={checkEnd}>STOP</Button>
        </ButtonSection>
        <FireAnimationSection>
          <FirewoodImg alt="firewoodimg" src="/images/firewood.png" />
          {userInfo.isOn && <FireGif alt="firegif" src="/images/fire.gif" />}
        </FireAnimationSection>
      </ButtonAnimationSection>

      {userInfo.normalAttendance && (
        <Modal height="300px">
          <SendTimeModal can={userInfo.normalAttendance} />
        </Modal>
      )}
    </Container>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

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
  font-size: ${({ theme }) => theme.pixelToRem(100)};
  font-weight: 700;
  margin-bottom: 10px;
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
  width: 500px;
  bottom: -10px;
`;

const getTime = timeHour => {
  const hour = timeHour;
  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
};
