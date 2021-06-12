import React from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';

export default function Batch() {
  return (
    <FadeIn transitionDuration={1000}>
      <BatchStyle>
        <BestBatch />
        <PeersBox />
      </BatchStyle>
    </FadeIn>
  );
}

const BatchStyle = Styled.main`
  max-width: 1440px;
  padding: 0 142px;
  margin: 0 auto;
`;
