import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
import ShowNowTime from '../ShowNowTime/ShowNowTime';
import changeBgColor from '../../Util/changeBgColor';
import countingTimer from '../Util/countingTimer';

export default function ScreenCaptureModal({
  userInfo,
  setIsScreenCaptureModal,
}) {
  const handleScreenCaptureModal = e => {
    const isClickedInside = e.target.closest('.modal');
    const isClickedBtn = e.target.closest('.captureBtn');

    if (setIsScreenCaptureModal) {
      if (!isClickedInside) return setIsScreenCaptureModal(false);
      if (isClickedBtn) return setIsScreenCaptureModal(false);
    }
  };

  return (
    <ScreenCapureModal onClick={handleScreenCaptureModal}>
      <InsideModal id="captureArea" className="modal">
        <ModalLeftArea>
          <Logo>We Record</Logo>
          <ShowNowTime modal={true} />
          <ModalTime>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[0]
                : changeTime(userInfo.totalTime)[0]}
            </div>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[1]
                : changeTime(userInfo.totalTime)[1]}
            </div>
            <div className="separator">:</div>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[3]
                : changeTime(userInfo.totalTime)[3]}
            </div>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[4]
                : changeTime(userInfo.totalTime)[4]}
            </div>
            <div className="separator">:</div>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[6]
                : changeTime(userInfo.totalTime)[6]}
            </div>
            <div className="time">
              {userInfo.isOn
                ? changeTime(
                    countingTimer(userInfo.totalTime, userInfo.lastStartTime)
                  )[7]
                : changeTime(userInfo.totalTime)[7]}
            </div>
          </ModalTime>
          <ModalFooter alt="wecode" src="/images/Footer/footer.png" />
        </ModalLeftArea>
        <ScreenCaptureModalImg alt="mainImg" src="/images/main/Saly-15.png" />
        <SaveImg
          className="captureBtn"
          onClick={() => ScreenCapture(setIsScreenCaptureModal)}
        >
          <img alt="snapshot" src="/images/main/Vector.png" />
          이미지로 저장하기
        </SaveImg>
      </InsideModal>
    </ScreenCapureModal>
  );
}

const Logo = styled.div`
  border: none;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.mobile`
    font-size: 16px;
  `}
`;

const ModalFooter = styled.img`
  width: 100px;
  margin-top: 100px;

  ${({ theme }) => theme.mobile`
    width: 60px;
    margin-top: 30px;
  `}
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

const InsideModal = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};
  position: relative;
  padding: 40px 50px;
  border: 3px solid ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  background: ${changeBgColor(dayjs().hour())};

  ${({ theme }) => theme.mobile`
    ${({ theme }) => theme.flexbox('row', 'center', 'center')};
    padding: 20px 25px;
  `}
`;

const ModalLeftArea = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
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
  font-size: 70px;
  font-weight: 700;
  line-height: 50px;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  .time {
    margin: 0 2px;
    padding: 16px 8px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.3);

    ${({ theme }) => theme.mobile`
      padding: 7px 4px;
    `}
  }

  .time:first-child {
    margin-left: 0;
  }

  .separator {
    padding-bottom: 8px;
  }

  ${({ theme }) => theme.tablet`
    font-size: 40px;
    line-height: 30px;
  `}

  ${({ theme }) => theme.mobile`
    font-size: 20px;
    line-height: 20px;
  `}
`;

const ScreenCaptureModalImg = styled.img`
  width: 33%;
  margin-left: 20px;
`;

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
