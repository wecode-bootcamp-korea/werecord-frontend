import React from 'react';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';

export default function Batch() {
  return (
    <BatchStyle>
      <BestBatch />
      <PeersBox />
    </BatchStyle>
  );
}

const BatchStyle = Styled.main`
  max-width: 1440px;
  margin: 0 auto;
`;
