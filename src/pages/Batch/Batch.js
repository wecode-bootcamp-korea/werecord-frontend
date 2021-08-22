import React, { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import Styled from 'styled-components';
import BestBatch from './BestBatch/BestBatch';
import PeersBox from './PeersBox/PeersBox';
import checkObjData from '../Util/checkObjData';
import API_URLS from '../../config';

export default function Batch({ match }) {
  const [batchInfo, setBatchInfo] = useState({});
  const { winner_batches_information, my_batch_information } = batchInfo;

  useEffect(() => {
    const batchNum = sessionStorage.getItem('batch');
    const matchBatchNum = match.params.id;
    chooseUserType(batchNum, matchBatchNum, setBatchInfo);
  }, [match.params.id]);

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {checkObjData(batchInfo) > 0 && (
          <BestBatch
            winnerInfo={winner_batches_information}
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

const Container = Styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'space-between')};
  max-width: 1040px;
  position: relative;
  height: calc(100vh - 200px);
  margin: 0 auto;
  z-index: 99;

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
