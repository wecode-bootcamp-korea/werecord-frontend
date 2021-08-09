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

  .ocean {
    position: absolute;
  }

  .wave {
    background: url(/images/bgImage/wave2.png) repeat-x;
    position: absolute;
    bottom: 0;
    width: 7480px;
    height: 75%;
    animation: wave 20s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }

  .wave:nth-of-type(2) {
    background: url(/images/bgImage/wave1.png) repeat-x;
    height: 85%;
    bottom: 0px;
    animation: wave 18s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }
`;
