import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import API_URLS from '../../config';
import MakeBatchForm from './EditMentorInfoForm';

export default function DeleteBatchInfoForm({ deleteBatchNumber }) {
  return (
    <Container>
      <Title>정말 삭제하시겠습니까?</Title>
      <Button version="white" clickEvent={handleDelete(deleteBatchNumber)}>
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

const handleDelete = value => {
  console.log(value);

  // fetch(`${API_URLS.DELETE_BATCH}`, {
  //   method: 'POST',
  //   // headers: {
  //   //   Authorization: sessionStorage.getItem('wrtoken'),
  //   // },
  //   body: JSON.stringify({}),
  // })
  //   .then(res => res.json())
  //   .then(
  //     res =>
  //       res.message === 'DELETE_SUCCESS' && alert('성공적으로 삭제했습니다!')
  //   );
};
