import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

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
  const [isCommentModal, setIsCommentModal] = useState({});
  const [stopModalPopUp, setStopModalPopUp] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  const [sendModalOff, setSendModalOff] = useState(false);
  const memoDate = useMemo(() => getTodayDate(), []);

  const useCallbackStartTime = useCallback(
    () => checkStart(setIsCommentModal),
    [isCommentModal]
  );
  const useCallbackStopTime = useCallback(
    () => checkStop(setIsCommentModal, setStopModalPopUp),
    [isCommentModal, stopModalPopUp]
  );

  useEffect(() => {
    getTimePasses(setTime);
    fetchUserData(setUserInfo, setCheckOffWorkDate);
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        <TimeSection>
          <TimeDescription>{memoDate}</TimeDescription>
          <TimeDescription>{showNowTime(time)}</TimeDescription>
        </TimeSection>
        <StartSection>
          <StudentName>{`${userInfo.name}님`}</StudentName>
          {!userInfo.isOn ? (
            <StartTime>오늘도 상쾌하게 시작해볼까요?</StartTime>
          ) : (
            <StartTime>{showStartTime(userInfo)}</StartTime>
          )}
        </StartSection>
        <ButtonAnimationSection>
          <ButtonSection>
            <Button onClick={useCallbackStartTime}>START</Button>
            <Button onClick={useCallbackStopTime}>STOP</Button>
          </ButtonSection>
          <FireAnimationSection>
            <FirewoodImg alt="firewoodimg" src="/images/firewood.png" />
            {userInfo.isOn && <FireGif alt="firegif" src="/images/fire.gif" />}
          </FireAnimationSection>
        </ButtonAnimationSection>

        {checkObjData(isCommentModal) && (
          <Modal setOff={setIsCommentModal} isCommentModal={true}>
            {stopModalPopUp && (
              <StopCommentTitle>오늘도 수고하셨습니다.</StopCommentTitle>
            )}
            <CommentModal comment={isCommentModal} />
          </Modal>
        )}

        {userInfo.normalAttendance && (
          <Modal>
            <SendTimeModal
              setOff={setSendModalOff}
              attendanceStatus={setUserInfo}
              checkOffWorkDate={checkOffWorkDate}
            />
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

  ${({ theme }) => theme.tablet`
    padding: 0;
  `}
`;

const TimeSection = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const TimeDescription = styled.h1`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(80)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};
`;

const StartSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'start', 'center')};
  margin-top: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(35)};
  font-weight: 500;

  ${({ theme }) => theme.tablet`
    margin: 0 auto;
    margin-bottom: 100px;
    font-size: 20px;
  `}
`;

const StudentName = styled.h2`
  padding: 8px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};
  background-color: ${({ theme }) => theme.colors.blue};

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const StartTime = styled.h2`
  color: ${({ theme }) => theme.colors.fontColor};
`;

const ButtonAnimationSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  margin-top: 100px;

  ${({ theme }) => theme.tablet`
    ${theme.flexbox('column', 'center', 'center')};
  `}
`;

const ButtonSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  width: 550px;
  margin-top: 50px;
  font-size: 50px;

  ${({ theme }) => theme.tablet`
    order: 2;
    width: 80vw;
    margin-top: 120px;
    font-size: 25px;
  `}
`;

const Button = styled.button`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColor};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.3;
  }
`;

const FireAnimationSection = styled.div`
  ${({ theme }) => theme.flexbox()};
  position: relative;
  margin-right: 150px;

  ${({ theme }) => theme.tablet`
    margin-right: 0;
  `}
`;

const FirewoodImg = styled.img`
  position: absolute;
  width: 200px;

  ${({ theme }) => theme.tablet`
    width: 130px;
  `}
`;

const FireGif = styled.img`
  position: absolute;
  width: 700px;
  bottom: -10px;

  ${({ theme }) => theme.tablet`
    width: 320px;
  `}
`;

const StopCommentTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const fetchUserData = (setUserInfo, setCheckOffWorkDate) => {
  fetch(`${API_URLS.MAIN}`, {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
        setUserInfo(prev => ({ ...prev, normalAttendance: true }));
        setCheckOffWorkDate(result);
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

const checkStart = setIsCommentModal => {
  fetch(`${API_URLS.MAIN}/start`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'ALREADY_RECORD_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '이미 출근하셨습니다.',
        }));
      }
      if (message === 'LOCATION_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '위코드에 계시나요?',
        }));
      }
      if (result) {
        window.location.replace('/main');
      }
    });
};

const checkStop = (setIsCommentModal, setStopModalPopUp) => {
  fetch(`${API_URLS.MAIN}/stop`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '출근이 아직 되지 않았습니다.',
        }));
      }
      if (message === 'ALREADY_RECORD_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '이미 퇴근하셨습니다.',
        }));
      }
      if (message === 'LOCATION_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '위코드에 계시나요?',
        }));
      }
      if (message === 'CLOSE_TIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '출근하신지 1분이 지나지 않았습니다.',
        }));
      }
      if (result) {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: result.comment,
        }));
        setStopModalPopUp(true);
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

const getTime = timeHour => {
  const hour = timeHour;
  return hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`;
};

const showNowTime = time => {
  return `${getTime(time.hour)}시 ${time.minutes}분입니다.`;
};

const showStartTime = userInfo => {
  return `${getTime(userInfo.startTime.split(':')[0])}시 ${
    userInfo.startTime.split(':')[1]
  }분에 시작하셨습니다.`;
};
