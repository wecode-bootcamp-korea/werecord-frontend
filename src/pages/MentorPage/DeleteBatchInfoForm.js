import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import API_URLS from '../../config';

export default function DeleteBatchInfoForm({ deleteBatchNumber, isModalOff }) {
  const handleDelete = () => {
    fetch(`${API_URLS.BATCH_MANAGEMENT}/${deleteBatchNumber}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(({ status }) => {
      if (status === 204) {
        alert('정상적으로 삭제가 완료되었습니다!');
        window.location.replace('/mentorpage');
      } else if (status === 400) {
        alert('수강생이 존재하므로 삭제가 불가합니다!');
        window.location.replace('/mentorpage');
      }
    });
  };
  return (
    <Container>
      <Title>정말 삭제하시겠습니까?</Title>
      <Button
        version="white"
        clickEvent={() => {
          handleDelete();
        }}
      >
        삭제
      </Button>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  margin: 40px 0;
  color: ${({ theme }) => theme.colors.red};
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
`;
