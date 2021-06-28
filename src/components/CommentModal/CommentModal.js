import React from 'react';
import styled from 'styled-components';

const CommentModal = props => {
  const { comment } = props.comment;

  return (
    <ModalContainer>
      <ContentSection>
        <p>{`> ${comment}`}</p>
      </ContentSection>
    </ModalContainer>
  );
};

export default CommentModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;
  padding: 20px 50px;
  line-height: 1.2;

  div {
    ${({ theme }) => theme.flexbox('column', 'start', 'start')};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ContentSection = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  margin-left: 50px;

  p {
    margin-right: 40px;
    font-size: 16px;
    font-weight: 700;

    ${({ theme }) => theme.tablet`
      font-size: 13px;
      font-weight: 400;
    `}
  }
`;
