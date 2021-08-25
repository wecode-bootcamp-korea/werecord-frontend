import dayjs from 'dayjs';

export default function countingTimer(totalTime, lastStartTime) {
  const changeSecond =
    lastStartTime &&
    Number(lastStartTime.split(':')[0]) * 3600 +
      Number(lastStartTime.split(':')[1]) * 60 +
      Number(lastStartTime.split(':')[2].split('.')[0]);

  const nowTime =
    dayjs().hour() * 3600 + dayjs().minute() * 60 + dayjs().second();

  const result = nowTime - changeSecond + totalTime;

  return result;
}
