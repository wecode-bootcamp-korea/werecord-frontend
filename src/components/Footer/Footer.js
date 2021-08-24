import React from 'react';
import Styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <Logo alt="wecode" src="/images/Footer/footer.png" />
      <MadeBy>
        <a
          href="https://github.com/wecode-bootcamp-korea/werecord-frontend"
          target="_blank"
          rel="noreferrer"
        >
          made by
        </a>
      </MadeBy>
    </Container>
  );
}

const Container = Styled.footer`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width: 1040px;
  margin: 50px auto;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.tablet`
    margin-top: 0;
    max-width: 840px;
  `}

  ${({ theme }) => theme.mobile`
    max-width: 300px;
  `}
`;

const Logo = Styled.img`
  width: 120px;

  ${({ theme }) => theme.mobile`
    width: 60px;
  `}
`;

const MadeBy = Styled.div`
  font-size: 13px;

  ${({ theme }) => theme.mobile`
    margin-bottom: 5px;
    font-size: 8px;
  `}
`;
