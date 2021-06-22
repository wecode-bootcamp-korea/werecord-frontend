import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import API_URLS from '../../config';

export default function DeleteBatchInfoForm({ deleteBatchNumber, isModalOff }) {
  const handleDelete = value => {
    fetch(`${API_URLS.DELETE_BATCH}`, {
      method: 'DELETE',
      headers: {
        // Authorization: sessionStorage.getItem('wrtoken'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        batch_id: value,
      }),
    }).then(res => {
      if (res.status === 204) {
        alert('성공적으로 삭제했습니다!');
        isModalOff();
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
          handleDelete(deleteBatchNumber);
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
