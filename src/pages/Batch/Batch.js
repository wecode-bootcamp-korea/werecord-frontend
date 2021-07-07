/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';
import checkObjData from '../Util/checkObjData';
import API_URLS from '../../config';

export default function Batch({ match }) {
  const [batchInfo, setBatchInfo] = useState({});
  const { winner_batch_information, my_batch_information } = batchInfo;

  useEffect(() => {
    const batchNum = sessionStorage.getItem('batch');
    const matchBatchNum = match.params.id;
    chooseUserType(batchNum, matchBatchNum, setBatchInfo);
  }, []);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {checkObjData(batchInfo) > 0 && (
          <BestBatch
            winnerInfo={winner_batch_information}
            myBatchInfo={my_batch_information}
          />
        )}
        {checkObjData(batchInfo) > 0 && (
          <PeersBox myBatchInfo={my_batch_information} />
        )}
      </Container>
    </FadeIn>
  );
}

const Container = Styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 142px;

  ${({ theme }) => theme.mobile`
    padding: 0;
  `}
`;

const chooseUserType = (batchNum, matchBatchNum, setBatchInfo) => {
  if (sessionStorage.getItem('user_type') === '수강생') {
    fetch(`${API_URLS.BATCH}/${batchNum}`, {
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      .then(res => res.json())
      .then(({ result }) => {
        setBatchInfo(result);
      });
  }
  if (matchBatchNum) {
    fetch(`${API_URLS.BATCH}/${matchBatchNum}`, {
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      .then(res => res.json())
      .then(({ result }) => {
        setBatchInfo(result);
      });
  }
};
