import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import ShowNowTime from './Main/ShowNowTime/ShowNowTime';
import SnapShotBtn from './Main/SnapShotBtn/SnapShotBtn';
import Flipclock from './Main/Flipclock/Flipclock';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

export default function Main() {
  const [userInfo, setUserInfo] = useState({
    isOn: false,
    normalAttendance: false,
    isStart: false,
    isStop: false,
    lastStartTime: '',
    totalTime: 0,
  });

  const [isCommentModal, setIsCommentModal] = useState({});
  const [stopModalOn, setStopModalOn] = useState(false);
  const [isScreenCaptureModal, setIsScreenCaptureModal] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  const [sendModalOff, setSendModalOff] = useState(false);

  useEffect(() => {
    fetchUserData(setUserInfo, setCheckOffWorkDate);
  }, []);

  return (
    <>
      <FadeIn transitionDuration={1000}>
        <Container>
          <LeftArea>
            <SnapShotBtn
              isScreenCaptureModalOn={isScreenCaptureModal}
              screenCaptureModalOn={setIsScreenCaptureModal}
            />
            <ShowNowTime />
            <Flipclock
              seconds={
                userInfo.isOn
                  ? countingTime(userInfo.totalTime, userInfo.lastStartTime)
                  : userInfo.totalTime
              }
              isOn={userInfo.isOn}
            />
            <BtnArea>
              {!userInfo.isOn && userInfo.isStart && !userInfo.isStop ? (
                <Button onClick={() => checkRestart(setUserInfo)}>
                  RE START
                </Button>
              ) : (
                <Button
                  onClick={() => checkStart(setIsCommentModal, setUserInfo)}
                  disabled={
                    userInfo.isStop | (userInfo.isOn && userInfo.isStart)
                  }
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

      {isScreenCaptureModal && (
        <ScreenCapureModal>
          <InsideModal id="captureArea">
            <LeftArea>
              <ShowNowTime modal={true} />
              <Flipclock modal={true} seconds={10000} isOn={userInfo.isOn} />
            </LeftArea>
            <MainImg
              modal={true}
              alt="mainImg"
              src="/images/main/Saly-15.png"
            />
            <SaveImg onClick={() => ScreenCapture()}>
              <img alt="snapshot" src="/images/main/Vector.png" />
              이미지로 저장하기
            </SaveImg>
          </InsideModal>
        </ScreenCapureModal>
      )}
    </>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width: 1440px;
  margin: 70px auto 0 auto;
  padding: 0 200px;
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

  ${({ modal }) => modal && `width: 220px; margin: 30px 35px;`}

  ${({ theme }) => theme.tablet`
    position: absolute;
    opacity: 0.1;
    z-index: -1;s
  `};
`;

const StopCommentTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const ScreenCapureModal = styled.section`
  ${({ theme }) => theme.flexbox('column')}
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const InsideModal = styled.div`
  ${({ theme }) => theme.flexbox('row')};
  position: relative;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.pink};
`;

const SaveImg = styled.div`
  ${({ theme }) => theme.flexbox('row')};
  position: absolute;
  right: 20px;
  bottom: -40px;
  font-size: 13px;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  cursor: pointer;

  img {
    margin-right: 6px;
  }
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
        const {
          user_status,
          start_status,
          stop_status,
          // last_start_time,
          // total_time,
        } = result;

        setUserInfo(prev => ({
          ...prev,
          isOn: user_status,
          isStart: start_status,
          isStop: stop_status,
          // lastStartTime: null,
          // totalTime: 0,
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
          // lastStartTime: result.start_at,
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
          // totalTime: result.total_time,
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
    .then(({ message, result }) => {
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
          // totalTime: result.total_time,
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
    .then(({ message, result }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        window.location.href = '/';
      }
      if (message === 'SUCCESS') {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          lastStartTime: result.restart.at,
          totalTime: result.total_time,
        }));
      }
    })
    .catch(error => console.log(error));
};

const ScreenCapture = () => {
  html2canvas(document.getElementById('captureArea'))
    .then(function (canvas) {
      saveAs(canvas.toDataURL(), 'file-name.jpg');
    })
    .catch(function (err) {
      console.log(err);
    });
};

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

const countingTime = (totalTime, lastStartTime) => {
  const changeSecond =
    lastStartTime &&
    Number(lastStartTime.split(':')[0]) * 3600 +
      Number(lastStartTime.split(':')[1]) * 60 +
      Number(lastStartTime.split(':')[2].split('.')[0]);

  const nowTime =
    dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();

  const result = nowTime - changeSecond + totalTime;

  return result;
};
