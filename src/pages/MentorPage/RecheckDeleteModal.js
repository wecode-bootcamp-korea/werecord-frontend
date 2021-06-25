import React from 'react';
import Styled from 'styled-components';

export default function RecheckDeleteModal({ deleteAccount }) {
  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <RecheckDeleteSection>
        <RecheckDeleteHeader>회원탈퇴</RecheckDeleteHeader>
        <RecheckDeleteBtn onClick={deleteAccount}>
          정말 탈퇴하시겠어요?
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
`;

const RecheckDeleteSection = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  padding: 30px;
`;

const RecheckDeleteHeader = Styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 70px;
`;

const RecheckDeleteBtn = Styled.button`
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.red};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;
