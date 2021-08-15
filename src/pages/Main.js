import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';
import CommentModal from '../components/CommentModal/CommentModal';
import ShowNowTime from './Main/ShowNowTime/ShowNowTime';
import ScreenCaptureBtn from './Main/ScreenCaptureBtn/ScreenCaptureBtn';
import Flipclock from './Main/Flipclock/Flipclock';
import checkObjData from './Util/checkObjData';
import API_URLS from '../config';

export default function Main() {
  const [userInfo, setUserInfo] = useState({
    isOn: false,
    normalAttendance: false,
    isStart: false,
    isStop: false,
    lastStartTime: null,
    totalTime: 0,
  });

  const [isCommentModal, setIsCommentModal] = useState({});
  const [startModalOn, setStartModalOn] = useState(false);
  const [stopModalOn, setStopModalOn] = useState(false);
  const [isScreenCaptureModal, setIsScreenCaptureModal] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  const [sendModalOff, setSendModalOff] = useState(false);

  useEffect(() => {
    fetchUserData(setUserInfo, setCheckOffWorkDate);
  }, []);

  const handleScreenCaptureModal = e => {
    const isClickedInside = e.target.closest('.modal');
    const isClickedBtn = e.target.closest('.captureBtn');

    if (setIsScreenCaptureModal) {
      if (!isClickedInside) return setIsScreenCaptureModal(false);
      if (isClickedBtn) return setIsScreenCaptureModal(false);
    }
  };

  return (
    <>
      <FadeIn transitionDuration={1000}>
        <Container>
          <LeftArea>
            <ScreenCaptureBtn
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
                  onClick={() =>
                    checkStart(setIsCommentModal, setUserInfo, setStartModalOn)
                  }
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
                onClick={() =>
                  checkStop(setIsCommentModal, setStopModalOn, setStartModalOn)
                }
                disabled={
                  (!userInfo.isStart && !userInfo.isStop) |
                  (!userInfo.isOn && userInfo.isStop)
                }
              >
                STOP
              </Button>
            </BtnArea>

            {checkObjData(isCommentModal) && (
              <Modal
                setOff={setIsCommentModal}
                isCommentModal={stopModalOn}
                width={400}
                height={240}
              >
                {startModalOn && (
                  <ModalImg alt="startImg" src="/images/modal/startImg.png" />
                )}
                {stopModalOn && (
                  <ModalImg alt="stopImg" src="/images/modal/stopImg.png" />
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
        <ScreenCapureModal onClick={handleScreenCaptureModal}>
          <InsideModal id="captureArea" className="modal">
            <LeftArea>
              <ShowNowTime modal={true} />
              <ModalTime>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[0]
                    : changeTime(userInfo.totalTime)[0]}
                </div>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[1]
                    : changeTime(userInfo.totalTime)[1]}
                </div>
                <div className="separator">:</div>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[3]
                    : changeTime(userInfo.totalTime)[3]}
                </div>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[4]
                    : changeTime(userInfo.totalTime)[4]}
                </div>
                <div className="separator">:</div>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[6]
                    : changeTime(userInfo.totalTime)[6]}
                </div>
                <div className="time">
                  {userInfo.isOn
                    ? changeTime(
                        countingTime(userInfo.totalTime, userInfo.lastStartTime)
                      )[7]
                    : changeTime(userInfo.totalTime)[7]}
                </div>
              </ModalTime>
            </LeftArea>
            <MainImg
              modal={true}
              alt="mainImg"
              src="/images/main/Saly-15.png"
            />
            <SaveImg
              className="captureBtn"
              onClick={() => ScreenCapture(setIsScreenCaptureModal)}
            >
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
  position: relative;
  margin: 30px auto;
  padding: 0 200px;
  z-index: 99;

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('row')};
    margin-top: 150px;
    padding: 0 50px;
  `}
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
    `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`};

  ${({ theme }) => theme.tablet`
    padding: 4px 14px;
    font-size: 18px;
  `};
`;

const MainImg = styled.img`
  width: ${({ theme }) => theme.pixelToRem(370)};
  margin-top: ${({ theme }) => theme.pixelToRem(50)};

  ${({ modal }) => modal && `width: 220px;  margin: 0 0 0 35px;`}

  ${({ theme }) => theme.tablet`
    position: absolute;
    opacity: 0.1;
    z-index: -1;
  `};
`;

const ModalImg = styled.img`
  width: 20%;
  margin-bottom: 23px;
`;

const ScreenCapureModal = styled.section`
  ${({ theme }) => theme.flexbox('column')}
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

const HOUR = dayjs().hour();
const InsideModal = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};
  position: relative;
  padding: 40px 50px;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  background: ${HOUR >= 22 &&
  'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)'};
  background: ${HOUR < 22 &&
  'linear-gradient(180deg, #FFC49D 0%, #9A8ADB 100%)'};
  background: ${HOUR < 18 &&
  `linear-gradient(180deg, #E7F5FF 0%, #FFC49D 100%)`};
  background: ${HOUR < 12 &&
  'linear-gradient(180deg, #FD92AE 0%, #E7F5FF 100%)'};
  background: ${HOUR < 9 &&
  'linear-gradient(180deg, #7C9BEA 0%, #FD92AE 100%)'};
  background: ${HOUR < 4 &&
  'linear-gradient(180deg, #9A8ADB 0%, #7C9BEA 100%)'};
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

const ModalTime = styled.div`
  ${({ theme }) => theme.flexbox('row')};
  font-size: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  .time {
    margin: 0 2px;
    padding: 7px 6px;
    border-radius: 10px;
    line-height: 50px;
    background: rgba(255, 255, 255, 0.3);
  }

  .time:first-child {
    margin-left: 0;
  }

  .separator {
    padding-bottom: 8px;
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
          total_time,
          last_start_time,
        } = result;

        setUserInfo(prev => ({
          ...prev,
          isOn: user_status,
          isStart: start_status,
          isStop: stop_status,
          lastStartTime: last_start_time,
          totalTime: total_time,
        }));
      }
    })
    .catch(error => console.log(error));
};

const checkStart = (setIsCommentModal, setUserInfo, setStartModalOn) => {
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
          lastStartTime: `${dayjs().hour()}:${dayjs().minute()}:${dayjs().second()}`,
        }));
        setIsCommentModal(prev => ({
          ...prev,
          isOn: true,
          comment: '오늘 기록이 시작되고 있습니다.',
        }));
        setStartModalOn(true);
      }
    })
    .catch(error => console.log(error));
};

const checkStop = (setIsCommentModal, setStopModalOn, setStartModalOn) => {
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
          comment: '오늘도 수고하셨습니다.',
        }));
        setStartModalOn(false);
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
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: false,
          totalTime: result.total_time,
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
      if (result) {
        setUserInfo(prev => ({
          ...prev,
          isOn: true,
          lastStartTime: result.restart_at,
          totalTime: result.total_time,
        }));
      }
    })
    .catch(error => console.log(error));
};

const ScreenCapture = setIsScreenCaptureModal => {
  html2canvas(document.getElementById('captureArea'))
    .then(function (canvas) {
      saveAs(canvas.toDataURL(), 'file-name.jpg');
    })
    .catch(function (err) {
      console.log(err);
    });
  setIsScreenCaptureModal(false);
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

const changeTime = countingTime => {
  let hour = Math.floor(countingTime / 3600);
  let minute = Math.floor((countingTime % 3600) / 60);
  let second = (countingTime % 3600) % 60;

  if (String(hour).length === 1) {
    hour = `0${hour}`;
  }

  if (String(minute).length === 1) {
    minute = `0${minute}`;
  }

  if (String(second).length === 1) {
    second = `0${second}`;
  }

  return `${hour}:${minute}:${second}`;
};
