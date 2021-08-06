import { useEffect, useState } from 'react';
import moment from 'moment';

export const useClockDigit = ({
  seconds,
  isOn,
}: {
  seconds: number;
  isOn: boolean;
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(seconds);
  const [hour1TranslateY, setHour1TranslateY] = useState(0);
  const [hour2TranslateY, setHour2TranslateY] = useState(0);
  const [minute1TranslateY, setMinute1TranslateY] = useState(0);
  const [minute2TranslateY, setMinute2TranslateY] = useState(0);
  const [second1TranslateY, setSecond1TranslateY] = useState(0);
  const [second2TranslateY, setSecond2TranslateY] = useState(0);

  useEffect(() => {
    setCurrentSeconds(seconds);
  }, [seconds, isOn]);

  useEffect(() => {
    const flipClockInterval = setInterval(function () {
      if (!isOn) {
        clearInterval(flipClockInterval);
        return;
      }

      const formatted = moment
        .utc(currentSeconds * 1000)
        .subtract(1, 'days')
        .format('HH:mm:ss');

      const hour1 = Number(formatted[0]);
      const hour2 = Number(formatted[1]);

      const minute1 = Number(formatted[3]);
      const minute2 = Number(formatted[4]);

      const second1 = Number(formatted[6]);
      const second2 = Number(formatted[7]);

      setHour1TranslateY(hour1);
      setHour2TranslateY(hour2);

      setMinute1TranslateY(minute1);
      setMinute2TranslateY(minute2);

      setSecond1TranslateY(second1);
      setSecond2TranslateY(second2);

      setCurrentSeconds(currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(flipClockInterval);
    };
  }, [currentSeconds, isOn]);

  return {
    hour1TranslateY,
    hour2TranslateY,
    minute1TranslateY,
    minute2TranslateY,
    second1TranslateY,
    second2TranslateY,
  };
};
