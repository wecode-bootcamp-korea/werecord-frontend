import React, { useState } from 'react';
import Styled from 'styled-components';
import API_URLS from '../../../config';

function SendTimeModal({ attendanceStatus }) {
  const [sendHour, setSendHour] = useState('');
  const [sendMinute, setSendMinute] = useState('');

  const sendTime = e => {
    e.preventDefault();

    if (sendHour !== '' && sendMinute !== '') {
      fetch(`${API_URLS.MAIN_PAGE}`, {
        method: 'POST',
        headers: { Authorization: sessionStorage.getItem('wrtoken') },
        body: JSON.stringify({
          hour: Number(sendHour),
          minute: Number(sendMinute),
        }),
      })
        .then(res => res.json())
        .then(isSuccess => {
          if (isSuccess.message === 'SUCCESS') {
            attendanceStatus(false);
          }
        });
    } else {
      alert('시간을 다시 확인해주세요.');
    }
  };

  const handleHourChange = e => {
    const { value } = e.target;

    setSendHour(value);

    if (value >= 24) {
      setSendHour(23);
    }
    if (value < 0) {
      setSendHour(0);
    }
  };

  const handleMinuteChange = e => {
    const { value } = e.target;

    setSendMinute(value);

    if (value >= 60) {
      setSendMinute(59);
    }
    if (value < 0) {
      setSendMinute(0);
    }
  };

  return (
    <Container>
      <ModalTitle>퇴근 시간 입력창</ModalTitle>
      <ModalDescription>
        어제 입력하지 못하신 퇴근 시간을 입력하세요.
      </ModalDescription>
      <SendTimeForm>
        <div>
          <InputTime
            type="number"
            placeholder="시간(0-23시)"
            value={sendHour}
            name="hour"
            onChange={handleHourChange}
            required
          />
          <InputTime
            type="number"
            placeholder="분(0-59분)"
            value={sendMinute}
            name="minute"
            onChange={handleMinuteChange}
            required
          />
        </div>
        <SendBtn onClick={sendTime}>보내기</SendBtn>
      </SendTimeForm>
    </Container>
  );
}

export default React.memo(SendTimeModal);

const Container = Styled.div``;

const ModalTitle = Styled.h1`
  padding: 33px 0;
  border-bottom: 1px solid gray;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ModalDescription = Styled.h1`
  margin: 30px 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
`;

const SendTimeForm = Styled.form`
  ${({ theme }) => theme.flexbox('column')}
`;

const InputTime = Styled.input`
  margin: 5px 10px;
  padding: 8px 20px;
  border: 1px solid rgba(34, 34, 34, 0.3);
  border-radius: 3px;
  transition: all 0.3s ease;

  &:focus {
    border: 1px solid #0066ff;
  }
`;

const SendBtn = Styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid rgba(34, 34, 34, 0.3);
  border-radius: 3px;
  font-size: 20px;
  line-height: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: rgba(34, 34, 34, 0.9);
  }
`;
