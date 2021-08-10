import * as React from 'react';

interface CountdownTimerItem {
  translateY: number;
}
const CountdownTimer: React.FC<CountdownTimerItem> = ({ translateY }) => (
  <div className="countdown-timer-item">
    <div
      className="digit-wrapper"
      style={{
        transform: `translateY(-${translateY}0%`,
        transitionDuration: `${translateY === 0 ? 200 : 500}ms`,
      }}
    >
      <span>0</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
    </div>
  </div>
);

export default CountdownTimer;
