import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';

export default function Batch() {
  const [batchInfo, setBatchInfo] = useState({});

  useEffect(() => {
    fetch('Data/BatchData.json')
      .then(res => res.json())
      .then(batchInfo => {
        setBatchInfo(batchInfo.result[0]);
      });
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <BatchStyle>
        {Object.keys(batchInfo).length > 0 && (
          <BestBatch
            winnerInfo={batchInfo.winner_batch_information}
            myBatchInfo={batchInfo.my_batch_information}
          />
        )}
        {Object.keys(batchInfo).length > 0 && (
          <PeersBox myBatchInfo={batchInfo.my_batch_information} />
        )}
      </BatchStyle>
    </FadeIn>
  );
}

const BatchStyle = Styled.main`
  max-width: 1440px;
  padding: 0 142px;
  margin: 0 auto;
`;
