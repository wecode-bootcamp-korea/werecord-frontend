import React from 'react';
import Styled from 'styled-components';

export default function SnapShotBtn({ screenCaptureModalOn }) {
  return (
    <Container onClick={() => screenCaptureModalOn(true)}>
      <Img alt="snapshot" src="/images/main/Vector.png" />
      이미지로 저장하기
    </Container>
  );
}

const Container = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom: 30px;
  font-family: 'Noto Sans KR';
  color: ${({ theme }) => theme.colors.fontColorWhite};
  font-size: ${({ theme }) => theme.pixelToRem(13)};
  cursor: pointer;
`;

const Img = Styled.img`
  margin-right: 6px;
  width: 20px;
  height: 20px;
`;
