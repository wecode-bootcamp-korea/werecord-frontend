import React from 'react';
import Styled from 'styled-components';
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
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <RecheckDeleteSection>
        <RecheckDeleteHeader>정말 삭제하시겠어요?</RecheckDeleteHeader>
        <RecheckDeleteBtn onClick={() => handleDelete()}>
          삭제하기
        </RecheckDeleteBtn>
      </RecheckDeleteSection>
    </ModalContainer>
  );
}

const ModalContainer = Styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;
`;

const MainLogo = Styled.div`
  font-size: 25px;
  padding: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};

  ${({ theme }) => theme.mobile`
    display: none;
  `}
`;

const RecheckDeleteSection = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  padding: 30px;
`;

const RecheckDeleteHeader = Styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const RecheckDeleteBtn = Styled.button`
  padding: 5px 20px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.black};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
  background-color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
    
  }
`;
