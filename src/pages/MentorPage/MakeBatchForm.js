import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API_URLS from '../../config';

export default function MakeBatchForm({ isModalOff }) {
  const [newBatchInformation, setNewBatchInformation] = useState({
    batchNumber: '',
    startDay: '',
    endDay: '',
  });

  const history = useHistory();

  const checkBatchNumberInputValid = value => {
    const batchNumberPattern = /^[0-9]*$/;
    return value.length > 0 && batchNumberPattern.test(value);
  };

  const checkDateInputValid = value => {
    const datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return datePattern.test(value);
  };

  const checkBatchBtnValid = () => {
    const { batchNumber, startDay, endDay } = newBatchInformation;
    return (
      checkBatchNumberInputValid(batchNumber) &&
      checkDateInputValid(startDay) &&
      checkDateInputValid(endDay)
    );
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setNewBatchInformation({ ...newBatchInformation, [name]: value });
  };

  const handleBatchMaking = e => {
    e.preventDefault();
    const { batchNumber, startDay, endDay } = newBatchInformation;
    fetch(`${API_URLS.BATCH_MAKING_BTN}`, {
      method: 'POST',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
      body: JSON.stringify({
        name: batchNumber,
        start_day: startDay,
        end_day: endDay,
      }),
    })
      .then(res => res.json())
      .then(() => {
        alert('성공적으로 기수를 생성하였습니다!');
        isModalOff();
        history.push('/mentorpage');
      });
  };

  return (
    <article>
      <Title>기수 정보를 입력해주세요 📝</Title>
      <NewBatchInformation>
        <Content>
          <Label>기수</Label>
          <Input
            placeholder="ex) 20기 => 20, 21기 => 21"
            maxLength="2"
            onChange={handleInput}
            name="batchNumber"
          ></Input>
        </Content>
        <Content>
          <Label>시작일</Label>
          <Input
            placeholder="ex) 2021-06-19"
            onChange={handleInput}
            name="startDay"
            maxLength="10"
          ></Input>
        </Content>
        <Content>
          <Label>종료일</Label>
          <Input
            placeholder="ex) 2021-09-21"
            onChange={handleInput}
            name="endDay"
            maxLength="10"
          ></Input>
        </Content>
        <MakeBatchBtn
          disabled={!checkBatchBtnValid()}
          onClick={handleBatchMaking}
          isOn={!checkBatchBtnValid()}
        >
          기수 생성
        </MakeBatchBtn>
        <CheckValid display={checkBatchBtnValid()}>
          * 형식에 맞게 작성해주세요!
        </CheckValid>
      </NewBatchInformation>
    </article>
  );
}

const Content = styled.div`
  margin-bottom: 30px;
`;

const Title = styled.h1`
  margin: 35px 0 60px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
`;
const NewBatchInformation = styled.form``;

const Label = styled.label`
  margin: 0 15px 5px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.pixelToRem(18)};
  font-weight: 700;
`;

const Input = styled.input`
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

const CheckValid = styled.div`
  display: ${({ display }) => display && 'none'};
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.pixelToRem(12)};
  font-weight: 700;
`;

const MakeBatchBtn = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-weight: 700;
  border: 1px solid ${({ theme, isOn }) => (isOn ? 'gray' : theme.colors.black)};
  border-radius: 3px;
  transition: 0.3s background-color;
  ${({ isOn }) => isOn || 'cursor: pointer'};

  &:hover {
    color: ${({ theme, isOn }) => isOn || theme.colors.white};
    background-color: ${({ theme, isOn }) =>
      isOn || theme.colors.backgroundColor};
  }

  &:active {
    opacity: 0.8;
  }
`;
