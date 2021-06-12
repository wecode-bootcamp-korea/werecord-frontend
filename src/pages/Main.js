import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import SendTimeModal from '../pages/Main/SendTimeModal/SendTimeModal';

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [canPushBtn, setCanPushBtn] = useState(false);
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  useEffect(() => {
    fetch('')
      .then(res => res.json())
      .then(isSuccess => {
        if (isSuccess.message === 'SUCCESS') {
          setCanPushBtn(true);
        } else {
          setCanPushBtn(false);
        }
      });
  }, []);

  useEffect(() => {
    const goTime = setTimeout(() => {
      setTime({
        ...time,
        hour: new Date().getHours(),
        minutes: new Date().getMinutes(),
      });
    }, 1000);
    return () => clearInterval(goTime);
  }, [time]);

  return (
    <Container>
      <TimeSection>
        <TimeDescription>
          {`지금은 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 ${
            day[new Date().getDay()]
          }요일`}
        </TimeDescription>
        <TimeDescription>
          {`${getTime(time.hour)}시 ${
            time.minutes !== 0 ? `${time.minutes}분` : ''
          }입니다.`}
        </TimeDescription>
      </TimeSection>
      <StartSection>
        {!isLogin ? (
          <StartTime>오늘도 상쾌하게 시작해볼까요?</StartTime>
        ) : (
          <>
            <StudentName>이다슬님</StudentName>
            <StartTime>{`은 시 분에 시작하셨습니다.`}</StartTime>
          </>
        )}
      </StartSection>
      <ButtonAnimationSection>
        <ButtonSection>
          <Button onClick={() => setIsLogin(!isLogin)} disabled={canPushBtn}>
            START
          </Button>
          <Button>STOP</Button>
        </ButtonSection>
        <FireAnimationSection>
          <FirewoodImg
            alt="firewoodimg"
            src="/images/firewood.png"
          ></FirewoodImg>
          <FireGif alt="firegif" src="/images/fire.gif"></FireGif>
        </FireAnimationSection>
      </ButtonAnimationSection>

      {canPushBtn && (
        <Modal height="300px">
          <SendTimeModal />
        </Modal>
      )}
    </Container>
  );
};

export default Main;

const day = ['일', '월', '화', '수', '목', '금', '토'];

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
