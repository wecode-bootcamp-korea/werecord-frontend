import React from 'react';
import styled from 'styled-components';

export default function Test() {
  return <Hello>안녕하세요</Hello>;
}

const Hello = styled.div`
  ${({ theme }) => theme.posCenter()}

  color: ${({ theme }) => theme.colors.green};
`;
