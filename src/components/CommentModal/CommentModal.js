import React from 'react';
import styled from 'styled-components';

const CommentModal = props => {
  const { comment } = props.comment;

  return <ModalContainer>{comment}</ModalContainer>;
};

export default CommentModal;

const ModalContainer = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorPurple};
`;
