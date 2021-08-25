import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import SendTimeModal from './SendTimeModal/SendTimeModal';
import CommentModal from '../../components/CommentModal/CommentModal';
import ShowNowTime from './ShowNowTime/ShowNowTime';
import ScreenCaptureBtn from './ScreenCaptureBtn/ScreenCaptureBtn';
import Flipclock from './Flipclock/Flipclock';
import ScreenCaptureModal from './ScreenCaptureModal/ScreenCaptureModal';
import countingTimer from './Util/countingTimer';
import API_URLS from '../../config';
import CheckTimerBtn from './CheckTimerBtn/CheckTimerBtn';

export default function Main() {
  const [userInfo, setUserInfo] = useState({
    isOn: false,
    normalAttendance: false,
    isStart: false,
    isStop: false,
    lastStartTime: null,
    totalTime: 0,
  });

  const [isOnCommentModal, setIsOnCommentModal] = useState();
  const [startAndStopImg, setStartAndStopImg] = useState('start');
  const [isScreenCaptureModal, setIsScreenCaptureModal] = useState(false);

  const [checkOffWorkDate, setCheckOffWorkDate] = useState('2021-04-12');
  const [sendTimeModal, setSendTimeModal] = useState(false);

  useEffect(() => {
    fetchUserData(setUserInfo, setCheckOffWorkDate);
  }, []);

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
                  ? countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  : userInfo.totalTime
              }
              isOn={userInfo.isOn}
            />
            <CheckTimerBtn
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setIsOnCommentModal={setIsOnCommentModal}
              setStartAndStopImg={setStartAndStopImg}
            />

            {isOnCommentModal && (
              <Modal
                setOff={setIsOnCommentModal}
                isOnCommentModal={startAndStopImg === 'stop'}
                width={400}
                height={240}
              >
                <ModalImg
                  alt="commentImg"
                  src={
                    startAndStopImg === 'start'
                      ? '/images/modal/startImg.png'
                      : '/images/modal/stopImg.png'
                  }
                />

                <CommentModal comment={isOnCommentModal} />
              </Modal>
            )}

            {userInfo.normalAttendance && (
              <Modal>
                <SendTimeModal
                  isOn={sendTimeModal}
                  setOff={setSendTimeModal}
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
        <ScreenCaptureModal
          userInfo={userInfo}
          setIsScreenCaptureModal={setIsScreenCaptureModal}
        />
      )}
    </>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width: 1040px;
  margin: 0 auto;

  ${({ theme }) => theme.tablet`
    max-width: 840px;
    margin-bottom: 40px;
  `}

  ${({ theme }) => theme.mobile`
    ${({ theme }) => theme.flexbox('row')};
    margin-top: 70px;
    height: 100%;
    padding: 0 50px;
  `}
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.mobile`
    ${({ theme }) => theme.flexbox('column')}
    width: 100%;
  `};
`;

const MainImg = styled.img`
  width: 34%;
  margin-top: ${({ theme }) => theme.pixelToRem(50)};

  ${({ theme }) => theme.mobile`
    position: absolute;
    width: 300px;
    margin: 0;
    opacity: 0.1;
    z-index: -1;
  `};
`;

const ModalImg = styled.img`
  width: 20%;
  margin-bottom: 23px;
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
