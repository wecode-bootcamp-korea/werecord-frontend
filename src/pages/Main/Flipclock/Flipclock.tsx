import * as React from 'react';
import { useEffect } from 'react';
import { flipclockStyle } from './styled';
import { useClockDigit } from './hooks';
import CountdownTimerItem from './Flipclock/Flipclock';

const dynamicStyle = document.createElement('style');
dynamicStyle.type = 'text/css';

interface FlipclockProps {
  seconds: number;
  isOn: boolean;
  modal: boolean;
}
const Flipclock: React.FC<FlipclockProps> = ({ seconds, isOn, modal }) => {
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
    <>
      {!modal ? (
        <div className="react-simple-flipclock">
          <CountdownTimerItem modal={false} translateY={hour1TranslateY} />
          <CountdownTimerItem modal={false} translateY={hour2TranslateY} />
          <span className="countdown-separator">:</span>
          <CountdownTimerItem modal={false} translateY={minute1TranslateY} />
          <CountdownTimerItem modal={false} translateY={minute2TranslateY} />
          <span className="countdown-separator">:</span>
          <CountdownTimerItem modal={false} translateY={second1TranslateY} />
          <CountdownTimerItem modal={false} translateY={second2TranslateY} />
        </div>
      ) : (
        <div className="react-simple-flipclock-modal">
          <CountdownTimerItem modal={true} translateY={hour1TranslateY} />
          <CountdownTimerItem modal={true} translateY={hour2TranslateY} />
          <span className="countdown-separator-modal">:</span>
          <CountdownTimerItem modal={true} translateY={minute1TranslateY} />
          <CountdownTimerItem modal={true} translateY={minute2TranslateY} />
          <span className="countdown-separator-modal">:</span>
          <CountdownTimerItem modal={true} translateY={second1TranslateY} />
          <CountdownTimerItem modal={true} translateY={second2TranslateY} />
        </div>
      )}
    </>
  );
};

export default Flipclock;
