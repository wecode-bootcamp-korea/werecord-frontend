import React from 'react';
import Styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <Logo alt="wecode" src="/images/Footer/footer.png" />
      <MadeBy>made by</MadeBy>
    </Container>
  );
}

const Container = Styled.footer`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width:  1440px;
  margin: 50px auto;
  padding: 0 200px;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mobile`
    margin-top: 160px;
    padding: 0 50px;
  `}
`;

const Logo = Styled.img`
  width: 120px;
`;

const MadeBy = Styled.div`
  font-size: 13px;
  ${({ theme }) => theme.mobile`
    margin-bottom: 5px;
  `}
`;
