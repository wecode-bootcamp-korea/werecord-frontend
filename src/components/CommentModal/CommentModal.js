import React from 'react';
import styled from 'styled-components';

const CommentModal = props => {
  const { comment } = props.comment;

  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>

      <ContentSection>
        <p>{comment}</p>
      </ContentSection>
    </ModalContainer>
  );
};

export default CommentModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;

  div {
    ${({ theme }) => theme.flexbox('column', 'start', 'start')};
    color: ${({ theme }) => theme.colors.black};
    margin-right: 10px;
  }
`;

const MainLogo = styled.div`
  /* margin-bottom: 25px; */
  border-bottom: 1px solid black;
  line-height: 1.5;
  font-weight: 700;
  font-size: 25px;
`;

const ContentSection = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  margin-left: 50px;
`;
