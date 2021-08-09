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
  .ocean {
    position: absolute;
  }

  .wave {
    background: url(/images/bgImage/wave1.png) repeat-x;
    position: absolute;
    bottom: 0;
    width: px;
    height: 85%;
    animation: wave 20s ease infinite;
  }

  .wave:nth-of-type(2) {
    background: url(/images/bgImage/wave2.png) repeat-x;
    height: 75%;
    bottom: 0;
    animation: wave 18s ease infinite;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1762px;
    }
  }
`;
