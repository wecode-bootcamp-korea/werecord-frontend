import React from 'react';
import styled from 'styled-components';

export default function Background() {
  return (
    <Container className="ocean">
      <div className="wave"></div>
      <div className="wave"></div>
    </Container>
  );
}

const Container = styled.div`
  z-index: 1;

  .wave {
    width: 6000px;
    height: 80%;
    position: fixed;
    bottom: 0;
    background: url(/images/bgImage/wave1.png) repeat-x;
    background-position: top;
    animation: wave 60s linear infinite;
  }

  .wave:nth-of-type(2) {
    background: url(/images/bgImage/wave2.png) repeat-x;
    height: 75%;
    bottom: 0;
    animation: wave 50s linear infinite;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1764px;
    }
  }
`;
