export const flipclockStyle = () => {
  return `
    .react-simple-flipclock {
      display: flex;
      align-items: center;
      height: 100px;
      margin-top: 40px;
      margin-bottom: 88px;
      overflow: hidden;
      font-family: "Noto Sans", sans-serif;
      font-weight: 700;
    }
    .react-simple-flipclock .countdown-separator {
      box-sizing: border-box;
      height: 82px;
      margin: 0 2px;
      font-size: 70px;
      color: #ffffff;
    }
    .react-simple-flipclock .countdown-timer-item {
      box-sizing: border-box;
      position: relative;
      width: 60px;
      height: 100%;
      margin: 0 2px;
      border-radius: 10px;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.3);
      overflow: hidden;
    }
    .react-simple-flipclock .countdown-timer-item .digit-wrapper {
      position: absolute;
      width: 100%;
      transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(-90%);
      will-change: transform;
    }
    .react-simple-flipclock .countdown-timer-item .digit-wrapper > span {
      position: relative;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 70px;
    }
  `;
};
