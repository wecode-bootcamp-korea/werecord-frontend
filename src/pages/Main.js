import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import ShowNowTime from './Main/ShowNowTime/ShowNowTime';
import SnapShotBtn from './Main/SnapShotBtn/SnapShotBtn';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

export default function Main({ history }) {
  const [userInfo, setUserInfo] = useState({
    name: '위코드',
    isOn: false,
    startTime: '00:00',
    normalAttendance: false,
    isStart: false,
    isStop: false,
  });
  const [isCommentModal, setIsCommentModal] = useState({});
  const [stopModalOn, setStopModalOn] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  // eslint-disable-next-line no-unused-vars
  const [sendModalOff, setSendModalOff] = useState(false);

  useEffect(() => {
    fetchUserData(setUserInfo, setCheckOffWorkDate, history);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        <LeftArea>
          <SnapShotBtn />
          <ShowNowTime />
          <ButtonSection>
            {!userInfo.isOn && userInfo.isStart && !userInfo.isStop ? (
              <Button onClick={() => checkRestart(setUserInfo, history)}>
                RE START
              </Button>
            ) : (
              <Button
                onClick={() =>
                  checkStart(setIsCommentModal, setUserInfo, history)
                }
                disabled={userInfo.isStop | (userInfo.isOn && userInfo.isStart)}
              >
                START
              </Button>
            )}
            {userInfo.isOn && (
              <Button
                onClick={() =>
                  checkPause(setIsCommentModal, setUserInfo, history)
                }
              >
                PAUSE
              </Button>
            )}
            <Button
              onClick={() =>
                checkStop(setIsCommentModal, setStopModalOn, history)
              }
              disabled={
                (!userInfo.isStart && !userInfo.isStop) |
                (!userInfo.isOn && userInfo.isStop)
              }
            >
              STOP
            </Button>
          </ButtonSection>

          {checkObjData(isCommentModal) && (
            <Modal setOff={setIsCommentModal} isCommentModal={stopModalOn}>
              {stopModalOn && (
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
        </LeftArea>
        <MainImg alt="mainImg" src="/images/main/Saly-15.png" />
      </Container>
    </FadeIn>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'center')};
  position: relative;
  padding-top: 150px;
  z-index: 99;
`;

const LeftArea = styled.div`
  margin-right: 217px;
`;

const ButtonSection = styled.section`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
`;

const Button = styled.button`
  margin-right: 20px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  &:active {
    opacity: 0.3;
  }

  ${({ disabled }) =>
    disabled &&
    `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`}
`;

const MainImg = styled.img`
  width: 350px;
  margin-top: 20px;
`;

const StopCommentTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const fetchUserData = (setUserInfo, setCheckOffWorkDate, history) => {
  fetch(`${API_URLS.MAIN}`, {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }

      if (message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
        setUserInfo(prev => ({ ...prev, normalAttendance: true }));
        setCheckOffWorkDate(result);
      }

      if (result) {
        const {
          user_name,
          user_status,
          user_start_time,
          start_status,
          stop_status,
        } = result;
        setUserInfo(prev => ({
          ...prev,
          name: user_name,
          isOn: user_status,
          startTime: user_start_time,
          isStart: start_status,
          isStop: stop_status,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkStart = (setIsCommentModal, setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/start`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
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
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          isStart: true,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkStop = (setIsCommentModal, setStopModalOn, history) => {
  fetch(`${API_URLS.MAIN}/stop`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
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
        setStopModalOn(true);
      }
    })
    .catch(error => console.log(error));
};

const checkPause = (setIsCommentModal, setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/pause`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'NEED_TO_RECORD_STARTTIME_ERROR') {
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: 'START를 먼저 누르세요.',
        }));
      }
      if (message === 'SUCCESS') {
        setUserInfo(prev => ({
          ...prev,
          isStart: false,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkRestart = (setUserInfo, history) => {
  fetch(`${API_URLS.MAIN}/restart`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ message }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        history.push('/');
      }
      if (message === 'SUCCESS') {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
        }));
      }
    })
    .catch(error => console.log(error));
};
