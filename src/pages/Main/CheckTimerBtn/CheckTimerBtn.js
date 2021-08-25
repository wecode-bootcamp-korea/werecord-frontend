import React from 'react';
import styled from 'styled-components';
import checkStart from '../Util/checkStart';
import checkStop from '../Util/checkStop';
import checkPause from '../Util/checkPause';
import checkRestart from '../Util/checkRestart';

export default function CheckTimerBtn({
  userInfo,
  setUserInfo,
  setIsOnCommentModal,
  setStartAndStopImg,
}) {
  return (
    <Container>
      {!userInfo.isOn && userInfo.isStart && !userInfo.isStop ? (
        <Button onClick={() => checkRestart(setUserInfo)}>RE START</Button>
      ) : (
        <Button
          onClick={() =>
            checkStart(setIsOnCommentModal, setUserInfo, setStartAndStopImg)
          }
          disabled={userInfo.isStop | (userInfo.isOn && userInfo.isStart)}
        >
          START
        </Button>
      )}
      {userInfo.isOn && (
        <Button onClick={() => checkPause(setIsOnCommentModal, setUserInfo)}>
          PAUSE
        </Button>
      )}
      <Button
        onClick={() => checkStop(setIsOnCommentModal, setStartAndStopImg)}
        disabled={
          (!userInfo.isStart && !userInfo.isStop) |
          (!userInfo.isOn && userInfo.isStop)
        }
      >
        STOP
      </Button>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
`;

const Button = styled.button`
  margin-right: ${({ theme }) => theme.pixelToRem(20)};
  padding: 8px 20px;
  border: 1px solid ${({ theme }) => theme.colors.regularBtnBorderColorWhite};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(24)};
  font-weight: 700;
  line-height: ${({ theme }) => theme.pixelToRem(40)};
  color: ${({ theme }) => theme.colors.regularBtnFontColorWhite};
  transition: all 0.3s ease;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.hoverBtnFontColorPurple};
    background: ${({ theme }) => theme.colors.hoverBtnBgWhite};

    ${({ disabled }) =>
      disabled &&
      `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`}
  }

  &:active {
    opacity: 0.7;
  }

  ${({ disabled }) =>
    disabled &&
    `background: rgba(255, 255, 255, 0.3); color: rgba(255, 255, 255, 0.7)`};

  ${({ theme }) => theme.mobile`
    padding: 4px 14px;
    font-size: 18px;
  `};
`;
