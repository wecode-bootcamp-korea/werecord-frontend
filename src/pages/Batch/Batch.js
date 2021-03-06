import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';
import API_URLS from '../../config';

export default function Batch({ match }) {
  const [batchInfo, setBatchInfo] = useState();

  useEffect(() => {
    const batchNum = sessionStorage.getItem('batch');
    const matchBatchNum = match.params.id;
    chooseUserType(batchNum, matchBatchNum, setBatchInfo);
  }, [match.params.id]);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {batchInfo && (
          <BestBatch
            winnerInfo={batchInfo.winner_batches_information}
            myBatchInfo={batchInfo.my_batch_information}
          />
        )}
        {batchInfo && <PeersBox myBatchInfo={batchInfo.my_batch_information} />}
      </Container>
    </FadeIn>
  );
}

const Container = Styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'space-between')};
  max-width: 1040px;
  margin: 0 auto;

  ${({ theme }) => theme.tablet`
    max-width: 840px;
    margin-top: 40px;
    margin-bottom: 40px;
  `}

  ${({ theme }) => theme.mobile`
    height: 100%;
    padding: 0 20px;
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
      .then(({ result, message }) => {
        if (message === 'REFRESH_TOKEN_EXPIRED') {
          sessionStorage.clear();
          window.location.href = '/';
        } else {
          setBatchInfo(result);
        }
      });
  }
  if (matchBatchNum) {
    fetch(`${API_URLS.BATCH}/${matchBatchNum}`, {
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      .then(res => res.json())
      .then(({ result, message }) => {
        if (message === 'REFRESH_TOKEN_EXPIRED') {
          sessionStorage.clear();
          window.location.href = '/';
        } else {
          setBatchInfo(result);
        }
      });
  }
  if (matchBatchNum !== batchNum) {
    window.location.href = '/notFound';
  }
};
