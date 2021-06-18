import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';

export default function Main({ history }) {
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
  const startTimeObj = {
    hour: userInfo.startTime.split(':')[0],
    minute: userInfo.startTime.split(':')[1],
  };

  useEffect(() => {
    const goTime = setInterval(() => {
      setTime(prev => ({
        ...prev,
        hour: dayjs().hour(),
        minutes: dayjs().minute(),
      }));
    }, 1000);
    return () => clearInterval(goTime);
  }, []);

  useEffect(() => {
    fetch('http://10.58.6.89:8000/records')
      .then(res => res.json())
      .then(isSuccess => {
        const { message, result } = isSuccess;

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
  }, []);

  const checkStart = () => {
    fetch(`http://10.58.6.89:8000/records/1`)
      .then(res => res.json())
      .then(errorData => {
        const { message, result } = errorData;

        if (message === 'ALREADY_RECORD_ERROR') {
          alert('이미 출근하셨습니다.');
        }
        if (message === 'LOCATION_ERROR') {
          alert('위코드에 오시긴 하셨나요?');
        }
        if (result) {
          alert(result.comment);
        }
        history.push('/main');
      });
  };

  const checkEnd = () => {
    fetch('http://10.58.6.89:8000/records/2')
      .then(res => res.json())
      .then(errorData => {
        const { message, result } = errorData;

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
        history.push('/main');
      });
  };

  return (
    <Container>
      <TimeSection>
        <TimeDescription>
          {`지금은 ${dayjs().month() + 1}월 ${dayjs().date()}일 ${
            WEEK[dayjs().day()]
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
            <StartTime>{`님은 ${startTimeObj.hour}시 ${startTimeObj.minute}분에 시작하셨습니다.`}</StartTime>
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
          <SendTimeModal attendanceStatus={userInfo.normalAttendance} />
        </Modal>
      )}
    </Container>
  );
}

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];

const Container = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
  width: 100%;
  margin-top: 130px;
  margin-left: 150px;
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
  width: 70vw;
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

const getTime = timeHour => {
  const hour = timeHour;
  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
};
