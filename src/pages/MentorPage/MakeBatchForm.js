import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
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
    const { batchNumber, startDay, endDay, mentorName } = newBatchInformation;
    if (startDay === endDay) {
      alert('날짜를 확인해주세요!');
    } else {
      fetch(`${API_URLS.BATCH_MANAGEMENT}`, {
        method: 'POST',
        headers: {
          Authorization: sessionStorage.getItem('wrtoken'),
        },
        body: JSON.stringify({
          name: batchNumber,
          start_day: startDay,
          end_day: endDay,
          mentor_name: mentorName,
        }),
      })
        .then(res => res.json())
        .then(({ message }) => {
          if (message === 'REFRESH_TOKEN_EXPIRED') {
            sessionStorage.clear();
            history.push('/');
          } else if (message === 'ALREADY_EXIST_ERROR') {
            alert('이미 존재하는 기수입니다!');
          } else if (message === 'RECHECK_DATE_ERROR') {
            alert('시작일과 종료일을 확인해주시기 바랍니다!');
          } else if (message === 'DATE_FORM_ERROR') {
            alert('날짜를 확인해주시기 바랍니다!');
          } else if (message === 'JSON_DECODE_ERROR') {
            alert('데이터 양식에 맞지 않습니다!');
          } else if (message === 'RECHECK_MENTOR_NAME_ERROR') {
            alert('멘토 이름을 확인해주시기 바랍니다!');
          } else {
            alert(`성공적으로 ${batchNumber}기를 생성하였습니다!`);
            isModalOff();
            window.location.replace('/mentorpage');
          }
        });
    }
  };

  return (
    <Container>
      <MainLogo>&gt;we-record</MainLogo>
      <BatchContainer>
        <Title>새 기수 생성 ✏️</Title>
        <NewBatchInformation>
          <Content>
            <Label>기수</Label>
            <Input
              placeholder="ex) 20기 > 20"
              maxLength="2"
              onChange={handleInput}
              name="batchNumber"
            ></Input>
          </Content>
          <Content>
            <Label>시작일</Label>
            <Input
              type="date"
              onChange={handleInput}
              name="startDay"
              max="2100-01-01"
            ></Input>
          </Content>
          <Content>
            <Label>종료일</Label>
            <Input
              type="date"
              onChange={handleInput}
              name="endDay"
              max="2100-01-01"
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
          <Button
            fontSize="12"
            type="white"
            disabled={!checkBatchBtnValid()}
            isOn={!checkBatchBtnValid()}
            clickEvent={handleBatchMaking}
          >
            기수생성
          </Button>
          {/* <CheckValid display={checkBatchBtnValid()}>
            * 형식에 맞게 작성해주세요!
          </CheckValid> */}
        </NewBatchInformation>
      </BatchContainer>
    </Container>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox()}
  padding:80px 10px;
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')}
  margin-bottom: 15px;
  width: 100%;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
`;

const BatchContainer = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
`;

const MainLogo = styled.div`
  margin-right: 40px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.mobile`
    display: none;
  `}
`;

const NewBatchInformation = styled.form`
  ${({ theme }) => theme.flexbox('column', 'center', 'flex-start')}
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.pixelToRem(16)};
  font-weight: 700;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  width: 100%;
`;
