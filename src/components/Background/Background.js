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
    height: 5%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #015871;
  }

  .wave {
    background: url(/images/background/morning2.png) repeat-x;
    position: absolute;
    bottom: 0;
    width: 200000px;
    height: 937px;
    animation: wave 10s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
    transform: translate3d(0, 0, 0);
  }

  .wave:nth-of-type(2) {
    background: url(/images/background/morning1.png) repeat-x;
    bottom: 0px;
    animation: wave 13s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite,
      swell 7s ease -1.25s infinite;
    opacity: 1;
  }

  @keyframes wave {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -1600px;
    }
  }

  @keyframes swell {
    0%,
    100% {
      transform: translate3d(0, -25px, 0);
    }
    50% {
      transform: translate3d(0, 5px, 0);
    }
  }
`;
