import React, { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';

export default function Main() {
  const [time, setTime] = useState({
    hour: dayjs().hour(),
    minutes: dayjs().minute(),
  });
  const [userInfo, setUserInfo] = useState({
    name: '위코드',
    isOn: false,
    startTime: '00:00',
    normalAttendance: false,
  });

  const memoStartTimeObj = useMemo(() => startTimeObj(userInfo), [userInfo]);
  const memoDate = useMemo(() => getTodayDate(), []);

  useEffect(() => {
    getTimePasses(setTime);
    fetchUserData(setUserInfo);
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        <TimeSection>
          <TimeDescription>{memoDate}</TimeDescription>
          <TimeDescription>
            {`${getTime(time.hour)}시 ${time.minutes}분입니다.`}
          </TimeDescription>
        </TimeSection>
        <StartSection>
          <StudentName>{userInfo.name}</StudentName>
          {!userInfo.isOn ? (
            <StartTime>님 오늘도 상쾌하게 시작해볼까요?</StartTime>
          ) : (
            <StartTime>{`님은${memoStartTimeObj.hour}시 ${memoStartTimeObj.minute}분에 시작하셨습니다.`}</StartTime>
          )}
        </StartSection>
        <ButtonAnimationSection>
          <ButtonSection>
            <Button onClick={checkStart}>START</Button>
            <Button onClick={checkStop}>STOP</Button>
          </ButtonSection>
          <FireAnimationSection>
            <FirewoodImg alt="firewoodimg" src="/images/firewood.png" />
            {userInfo.isOn && <FireGif alt="firegif" src="/images/fire.gif" />}
          </FireAnimationSection>
        </ButtonAnimationSection>

        {userInfo.normalAttendance && (
          <Modal height="300px">
            <SendTimeModal attendanceStatus={userInfo.normalAttendance} />
          </Modal>
        )}
      </Container>
    </FadeIn>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Container = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
  max-width: 1440px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 142px;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const TimeSection = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
`;

const TimeDescription = styled.h1`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(100)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};
`;

const StartSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'start', 'center')};
  margin-top: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(40)};
  font-weight: 500;
`;

const StudentName = styled.h2`
  padding: 8px;
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.blue};
`;

const StartTime = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
`;

const ButtonAnimationSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  margin-top: 100px;
`;

const ButtonSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')}
  width: 40vw;
  font-size: 50px;
`;

const Button = styled.button`
  margin-right: 20px;
  color: ${({ theme }) => theme.colors.fontColor};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }
`;

const FireAnimationSection = styled.div`
  ${({ theme }) => theme.flexbox()};
  position: relative;
`;

const FirewoodImg = styled.img`
  position: absolute;
  width: 120px;
`;

const FireGif = styled.img`
  position: absolute;
  width: 500px;
  bottom: -10px;
`;

const fetchUserData = setUserInfo => {
  fetch('http://10.58.2.17:8000/records', {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
        return setUserInfo(prev => ({ ...prev, normalAttendance: true }));
      }
      if (result) {
        const { user_name, user_status, user_start_time } = result;
        setUserInfo(prev => ({
          ...prev,
          name: user_name,
          isOn: user_status,
          startTime: user_start_time,
        }));
      }
    });
};

const checkStart = () => {
  fetch(`http://10.58.2.17:8000/records/start`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'ALREADY_RECORD_ERROR') {
        alert('이미 출근하셨습니다.');
      }
      if (message === 'LOCATION_ERROR') {
        alert('위코드에 오시긴 하셨나요?');
      }
      if (result) {
        window.location.replace('/main');
      }
    });
};

const checkStop = () => {
  fetch('http://10.58.2.17:8000/records/stop', {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        alert('출석부터 누르세요');
      }
      if (message === 'ALREADY_RECORD_ERROR') {
        alert('이미 퇴근했습니다.');
      }
      if (message === 'LOCATION_ERROR') {
        alert('위코드에 계시긴 하나요?');
      }
      if (result) {
        alert(result.comment);
      }
    });
};

const getTimePasses = setTime => {
  const goTime = setInterval(() => {
    setTime(prev => ({
      ...prev,
      hour: dayjs().hour(),
      minutes: dayjs().minute(),
    }));
  }, 1000);
  return () => clearInterval(goTime);
};

const getTodayDate = () => {
  return `지금은 ${dayjs().month() + 1}월 ${dayjs().date()}일 ${
    WEEK[dayjs().day()]
  }요일`;
};

const startTimeObj = userInfo => {
  if (userInfo.startTime === null) {
    const initTime = {
      hour: '00',
      minute: '00',
    };
    return initTime;
  }
  if (userInfo.startTime) {
    const nowTime = {
      hour: userInfo.startTime.split(':')[0],
      minute: userInfo.startTime.split(':')[0],
    };
    return nowTime;
  }
};

const getTime = timeHour => {
  const hour = timeHour;
  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
};
