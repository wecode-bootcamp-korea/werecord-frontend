import * as React from 'react';
import { useEffect } from 'react';
import { flipclockStyle } from './styled';
import { useClockDigit } from './hooks';
import CountdownTimerItem from './Timer/timer';

const dynamicStyle = document.createElement('style');
dynamicStyle.type = 'text/css';

interface FlipclockProps {
  seconds: number;
  isOn: boolean;
}
const Flipclock: React.FC<FlipclockProps> = ({ seconds, isOn }) => {
  useEffect(() => {
    const head = document.querySelector('head') as HTMLHeadElement;
    dynamicStyle.innerHTML = flipclockStyle();
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
    <div className="react-simple-flipclock">
      <CountdownTimerItem translateY={hour1TranslateY} />
      <CountdownTimerItem translateY={hour2TranslateY} />
      <span className="countdown-separator">:</span>
      <CountdownTimerItem translateY={minute1TranslateY} />
      <CountdownTimerItem translateY={minute2TranslateY} />
      <span className="countdown-separator">:</span>
      <CountdownTimerItem translateY={second1TranslateY} />
      <CountdownTimerItem translateY={second2TranslateY} />
    </div>
  );
};

export default Flipclock;
