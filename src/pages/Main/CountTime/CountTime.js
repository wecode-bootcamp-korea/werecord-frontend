import React from 'react';
import Styled from 'styled-components';

export default function CountTime() {
  return <Container>00:00:00</Container>;
}

const Container = Styled.section`
  margin-bottom: 88px;
  padding: 5px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(70)};
  font-weight: 700;
  background: rgba(255, 255, 255, 0.3);
`;
