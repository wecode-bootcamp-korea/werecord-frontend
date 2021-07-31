import React from 'react';
import Styled from 'styled-components';

export default function SnapShotBtn() {
  return (
    <Container>
      <Img alt="snapshot" src="/images/main/Vector.png" />
      이미지로 저장하기
    </Container>
  );
}

const Container = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  cursor: pointer;
`;

const Img = Styled.img`
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;
