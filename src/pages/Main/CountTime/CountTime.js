import React from 'react';
import Styled from 'styled-components';

export default function CountTime() {
  return (
    <Container>
      <TimeSection>0</TimeSection>
      <TimeSection className="lastText">0</TimeSection>
      <TimeDivider>:</TimeDivider>
      <TimeSection>0</TimeSection>
      <TimeSection className="lastText">0</TimeSection>
      <TimeDivider>:</TimeDivider>
      <TimeSection>0</TimeSection>
      <TimeSection>0</TimeSection>
    </Container>
  );
}

const Container = Styled.section`
  ${({ theme }) => theme.flexbox('row', 'flex-start')}
  margin-bottom: 88px;
  padding: 5px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(70)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  
  .lastText {
    margin-right: 2px;
  }
`;

const TimeSection = Styled.div`
  margin-right: 8px;
  padding: 16px 10px;
  border-radius:10px;
  background: rgba(255, 255, 255, 0.3);
`;

const TimeDivider = Styled.div`
  height: 82px;
  margin-right: 2px;
`;
