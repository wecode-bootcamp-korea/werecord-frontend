import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import ShowNowTime from './Main/ShowNowTime/ShowNowTime';
import CountTime from './Main/CountTime/CountTime';
import SnapShotBtn from './Main/SnapShotBtn/SnapShotBtn';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

export default function Main() {
  const [userInfo, setUserInfo] = useState({
    isOn: false,
    normalAttendance: false,
    isStart: false,
    isStop: false,
  });
  const [isCommentModal, setIsCommentModal] = useState({});
  const [stopModalOn, setStopModalOn] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  const [sendModalOff, setSendModalOff] = useState(false);

  useEffect(() => {
    fetchUserData(setUserInfo, setCheckOffWorkDate);
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        <LeftArea>
          <SnapShotBtn />
          <ShowNowTime />
          <CountTime />
          <BtnArea>
            {!userInfo.isOn && userInfo.isStart && !userInfo.isStop ? (
              <Button onClick={() => checkRestart(setUserInfo)}>
                RE START
              </Button>
            ) : (
              <Button
                onClick={() => checkStart(setIsCommentModal, setUserInfo)}
                disabled={userInfo.isStop | (userInfo.isOn && userInfo.isStart)}
              >
                START
              </Button>
            )}
            {userInfo.isOn && (
              <Button
                onClick={() => checkPause(setIsCommentModal, setUserInfo)}
              >
                PAUSE
              </Button>
            )}
            <Button
              onClick={() => checkStop(setIsCommentModal, setStopModalOn)}
              disabled={
                (!userInfo.isStart && !userInfo.isStop) |
                (!userInfo.isOn && userInfo.isStop)
              }
            >
              STOP
            </Button>
          </BtnArea>

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
                isOn={sendModalOff}
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
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  margin: ${({ theme }) => theme.pixelToRem(70)}
    ${({ theme }) => theme.pixelToRem(200)} 0
    ${({ theme }) => theme.pixelToRem(200)};
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')}
    width: 100%;
  `};
`;

const BtnArea = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
`;

const Button = styled.button`
  margin-right: ${({ theme }) => theme.pixelToRem(20)};
  padding: 8px 20px;
  border: 1px solid ${({ theme }) => theme.colors.regularBtnBorderColorWhite};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(24)};
  font-weight: 700;
  line-height: ${({ theme }) => theme.pixelToRem(40)};
  color: ${({ theme }) => theme.colors.regularBtnFontColorWhite};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverBtnFontColorPurple};
    background: ${({ theme }) => theme.colors.hoverBtnBgWhite};

    ${({ disabled }) =>
      disabled &&
      `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`}
  }

  &:active {
    opacity: 0.7;
  }

  ${({ disabled }) =>
    disabled &&
    `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`}
`;

const MainImg = styled.img`
  width: ${({ theme }) => theme.pixelToRem(370)};
  margin-top: ${({ theme }) => theme.pixelToRem(50)};

  ${({ theme }) => theme.tablet`
    position: absolute;
    opacity: 0.1;
    z-index: -1;
  `};
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
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        window.location.href = '/';
      }

      if (message === 'NEED_TO_RECORD_ENDTIME_ERROR') {
        setUserInfo(prev => ({ ...prev, normalAttendance: true }));
        setCheckOffWorkDate(result);
      }

      if (result) {
        const { user_status, start_status, stop_status } = result;

        setUserInfo(prev => ({
          ...prev,
          isOn: user_status,
          isStart: start_status,
          isStop: stop_status,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkStart = (setIsCommentModal, setUserInfo) => {
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
        window.location.href = '/';
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

const checkStop = (setIsCommentModal, setStopModalOn) => {
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
        window.location.href = '/';
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

const checkPause = (setIsCommentModal, setUserInfo) => {
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
        window.location.href = '/';
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
          isOn: false,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkRestart = setUserInfo => {
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
        window.location.href = '/';
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
