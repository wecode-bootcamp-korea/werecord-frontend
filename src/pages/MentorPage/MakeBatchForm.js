import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import API_URLS from '../../config';

export default function MakeBatchForm({ isModalOff }) {
  const [newBatchInformation, setNewBatchInformation] = useState({
    batchNumber: '',
    startDay: '',
    endDay: '',
    mentorName: '',
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

  // const checkMentorNameValid = value => {
  //   if (value.length === (3 || 4)) return true;
  // };

  const checkBatchBtnValid = () => {
    const { batchNumber, startDay, endDay, mentorName } = newBatchInformation;
    return (
      checkBatchNumberInputValid(batchNumber) &&
      checkDateInputValid(startDay) &&
      checkDateInputValid(endDay)
      // &&
      // checkMentorNameValid(mentorName)
    );
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setNewBatchInformation({ ...newBatchInformation, [name]: value });
  };

  const handleBatchMaking = e => {
    e.preventDefault();
    const { batchNumber, startDay, endDay, mentorName } = newBatchInformation;
    if (startDay === endDay) {
      alert('날짜를 확인해주세요!');
    } else {
      fetch(`${API_URLS.BATCH_MAKING_BTN}`, {
        method: 'POST',
        // headers: {
        //   Authorization: sessionStorage.getItem('wrtoken'),
        // },
        body: JSON.stringify({
          name: batchNumber,
          start_day: startDay,
          end_day: endDay,
          mentor_name: mentorName,
        }),
      })
        .then(res => res.json())
        .then(batchMakingStatus => {
          console.log(batchMakingStatus);
          if (batchMakingStatus.message === 'ALREADY_EXIT_ERROR') {
            alert('이미 존재하는 기수입니다!');
          } else if (batchMakingStatus.message === 'RECHECK_DATE_ERROR') {
            alert('시작일과 종료일을 확인해주시기 바랍니다!');
          } else if (batchMakingStatus.message === 'DATE_FORM_ERROR') {
            alert('날짜를 확인해주시기 바랍니다!');
          } else if (batchMakingStatus.message === 'JSON_DECODE_ERROR') {
            alert('데이터 양식에 맞지 않습니다!');
          } else if (
            batchMakingStatus.message === 'RECHECK_MENTOR_NAME_ERROR'
          ) {
            alert('멘토 이름을 확인해주시기 바랍니다!');
          } else {
            alert(`성공적으로 ${batchNumber}기를 생성하였습니다!`);
            isModalOff();
            window.location.replace('/mentorpage');
          }
        });
    }
  };

  console.log(newBatchInformation);

  return (
    <article>
      <Title>기수 정보를 입력해주세요 📝</Title>
      <NewBatchInformation>
        <Content>
          <Label>기수</Label>
          <Input
            placeholder="ex) 5기 => 5, 20기 => 20"
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
        <Content>
          <Label>담당 멘토</Label>
          <Input
            placeholder="ex) 홍길동"
            onChange={handleInput}
            name="mentorName"
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
