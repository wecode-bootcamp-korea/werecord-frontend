import React, { useState } from 'react';
import styled from 'styled-components';
import API_URLS from '../../config';
import Button from '../../components/Button/Button';

export default function MakeBatchForm({ isModalOff, prevBatchInformation }) {
  const [editBatchInformation, setEditBatchInformation] = useState({
    batchNumber: prevBatchInformation['batch_id'],
    startDay: prevBatchInformation['batch_start_day'],
    endDay: prevBatchInformation['batch_end_day'],
    mentorName: prevBatchInformation['mentor_name'],
  });

  const checkBatchNumberInputValid = value => {
    const batchNumberPattern = /^[0-9]*$/;
    return value.length > 0 && batchNumberPattern.test(value);
  };

  const checkDateInputValid = value => {
    const datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return datePattern.test(value);
  };

  const checkBatchBtnValid = () => {
    const { batchNumber, startDay, endDay } = editBatchInformation;
    return (
      checkBatchNumberInputValid(batchNumber) &&
      checkDateInputValid(startDay) &&
      checkDateInputValid(endDay)
    );
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setEditBatchInformation({ ...editBatchInformation, [name]: value });
  };

  const handleBatchEdit = e => {
    e.preventDefault();
    const { batchNumber, startDay, endDay, mentorName } = editBatchInformation;
    if (startDay === endDay) {
      alert('날짜를 확인해주세요!');
    } else {
      fetch(
        `${API_URLS.BATCH_MANAGEMENT}/${prevBatchInformation['batch_id']}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: sessionStorage.getItem('wrtoken'),
          },
          body: JSON.stringify({
            new_batch_name: batchNumber,
            start_day: startDay,
            end_day: endDay,
            mentor_name: mentorName,
          }),
        }
      )
        .then(res => res.json())
        .then(batchMakingStatus => {
          if (batchMakingStatus.message === 'RECHECK_DATE_ERROR') {
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
            alert(
              `성공적으로 ${prevBatchInformation['batch_id']}기 정보를 수정하였습니다!`
            );
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
        <Title>기수 정보 수정 ✏️</Title>
        <EditBatchInformation>
          <Content>
            <Label>기수</Label>
            <Input
              placeholder="ex)20기 > 20"
              maxLength="2"
              onChange={handleInput}
              name="batchNumber"
              value={editBatchInformation.batchNumber}
            ></Input>
          </Content>
          <Content>
            <Label>시작일</Label>
            <Input
              type="date"
              placeholder="ex) 2021-06-19"
              onChange={handleInput}
              name="startDay"
              max="2100-01-01"
              value={editBatchInformation.startDay}
            ></Input>
          </Content>
          <Content>
            <Label>종료일</Label>
            <Input
              type="date"
              placeholder="ex) 2021-09-21"
              onChange={handleInput}
              name="endDay"
              max="2100-01-01"
              value={editBatchInformation.endDay}
            ></Input>
          </Content>
          <Content>
            <Label>담당 멘토</Label>
            <Input
              placeholder="ex) 홍길동"
              onChange={handleInput}
              name="mentorName"
              value={editBatchInformation.mentorName}
            ></Input>
          </Content>
          <Button
            fontSize="12"
            type="white"
            disabled={!checkBatchBtnValid()}
            isOn={!checkBatchBtnValid()}
            clickEvent={handleBatchEdit}
          >
            정보 수정
          </Button>
        </EditBatchInformation>
      </BatchContainer>
    </Container>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox()}
  padding:100px 10px;
`;

const BatchContainer = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 30px;
  width: 100%;
`;

const MainLogo = styled.div`
  margin-right: 40px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.h1`
  margin: 35px 0 40px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
const EditBatchInformation = styled.form`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  width:100%;
`;

const Label = styled.label`
  margin: 0 0 10px;
  font-size: ${({ theme }) => theme.pixelToRem(16)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const Input = styled.input`
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;
