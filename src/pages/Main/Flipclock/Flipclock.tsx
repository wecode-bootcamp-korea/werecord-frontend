import * as React from 'react';
import { useEffect } from 'react';
import { useClockDigit } from './hooks';
import styled from 'styled-components';
import CountdownTimer from './Flipclock/Flipclock';

const dynamicStyle = document.createElement('style');
dynamicStyle.type = 'text/css';

interface FlipclockProps {
  seconds: number;
  isOn: boolean;
}
const Flipclock: React.FC<FlipclockProps> = ({ seconds, isOn }) => {
  useEffect(() => {
    const head = document.querySelector('head') as HTMLHeadElement;
    head.append(dynamicStyle);
    return () => {
      dynamicStyle.remove();
    };
  }, []);

  const {
    hour1TranslateY,
    hour2TranslateY,
    minute1TranslateY,
    minute2TranslateY,
    second1TranslateY,
    second2TranslateY,
  } = useClockDigit({ seconds, isOn });

  return (
    <Container className="react-simple-flipclock">
      <CountdownTimer translateY={hour1TranslateY} />
      <CountdownTimer translateY={hour2TranslateY} />
      <span className="countdown-separator">:</span>
      <CountdownTimer translateY={minute1TranslateY} />
      <CountdownTimer translateY={minute2TranslateY} />
      <span className="countdown-separator">:</span>
      <CountdownTimer translateY={second1TranslateY} />
      <CountdownTimer translateY={second2TranslateY} />
    </Container>
  );
};

export default Flipclock;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  margin-top: 40px;
  margin-bottom: 88px;
  overflow: hidden;
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;

  ${({ theme }) => theme.tablet`
    height: 60px;
    margin-bottom: 40px;
  `}

  ${({ theme }) => theme.mobile`
    margin-top: 10px;
    height: 50px;
  `}

  .countdown-separator {
    box-sizing: border-box;
    height: 82px;
    margin: 0 2px;
    font-size: 70px;
    color: #ffffff;

    ${({ theme }) => theme.tablet`
      height: 60px;
      font-size: 52px;
    `}

    ${({ theme }) => theme.mobile`
      height: 50px;
      font-size: 42px;
    `}
  }

  .countdown-timer-item {
    box-sizing: border-box;
    position: relative;
    width: 60px;
    height: 100%;
    margin: 0 2px;
    border-radius: 10px;
    color: #ffffff;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;

    ${({ theme }) => theme.tablet`
      width: 50px;
    `}

    ${({ theme }) => theme.mobile`
      width: 42px;
    `}
  }

  .countdown-timer-item .digit-wrapper {
    position: absolute;
    width: 100%;
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateY(-90%);
    will-change: transform;
  }

  .countdown-timer-item .digit-wrapper > span {
    position: relative;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;

    ${({ theme }) => theme.tablet`
      height: 60px;
      font-size: 52px;
    `}

    ${({ theme }) => theme.mobile`
      height: 50px;
      font-size: 42px;
    `}
  }
`;
