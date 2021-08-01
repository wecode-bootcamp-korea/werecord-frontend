import React from 'react';
import Styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <Logo>{'>'} wecode</Logo>
      <div className="rightArea">
        <MadeBy>made by</MadeBy>
        <Producer>제작지원 : 주식회사 그레이스풀레인</Producer>
      </div>
    </Container>
  );
}

const Container = Styled.footer`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  padding: 100px 200px;
  color: ${({ theme }) => theme.colors.white};

  .rightArea {
    ${({ theme }) => theme.flexbox('row')};
  }
`;

const Logo = Styled.div`
  font-size: 30px;
  opacity: 0.7;
`;

const Producer = Styled.div`
  margin-left: 50px;
  font-size: 13px;
`;

const MadeBy = Styled.div`
  font-size: 13px;
`;
