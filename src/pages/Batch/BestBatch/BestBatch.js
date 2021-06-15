import React from 'react';
import Styled, { keyframes } from 'styled-components';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  return (
    <>
      <WhoBestBatch>
        <BestBatchTitle>record of legend</BestBatchTitle>
        <BestBatchTime>
          {`${winnerInfo.winner_batch_name}기 ${Math.floor(
            winnerInfo.winner_batch_total_time
          ).toLocaleString()}시간 달성`}
        </BestBatchTime>
      </WhoBestBatch>
      <LankingArea>
        <BatchLanking>
          <MyBatch>
            <div className="myBatch">Wecode {myBatchInfo.batch_name}기</div>
            <MyBatchTime>
              {`${Math.floor(
                myBatchInfo.batch_total_time
              ).toLocaleString()}시간 ing...`}
              <img alt="cat" src="/images/run_cat.gif" />
            </MyBatchTime>
          </MyBatch>
        </BatchLanking>
        <PersonLanking>
          <BestPersonTitle>지난주 지박령</BestPersonTitle>
          <BestPersons>
            <BestPerson height="45%">
              {myBatchInfo.ghost_ranking[0].user_name}
            </BestPerson>
            <BestPerson height="70%">
              {myBatchInfo.ghost_ranking[1].user_name}
            </BestPerson>
            <BestPerson height="30%">
              {myBatchInfo.ghost_ranking[2].user_name}
            </BestPerson>
          </BestPersons>
        </PersonLanking>
      </LankingArea>
    </>
  );
}

const LankingArea = Styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};
`;

const BatchLanking = Styled.div`
  display: ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  padding: 20px;
  width: 50%;
`;

const WhoBestBatch = Styled.div`
  ${({ theme }) => theme.flexbox('row')}
  margin-top: 80px;
  height: 50px;
`;

const BestBatchTitle = Styled.span`
  ${({ theme }) => theme.flexbox('column')};
  padding-top: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
`;

const BestBatchTime = Styled.span`
  ${({ theme }) => theme.flexbox('column')};
  font-size: ${({ theme }) => theme.pixelToRem(30)};
`;

const MyBatch = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'flex-start')};

  margin-top: ${({ theme }) => theme.pixelToRem(43)};
  font-size: ${({ theme }) => theme.pixelToRem(40)};
  font-weight: 700;

  img {
    position: absolute;
    bottom: 0;
    right: -50px;
    width: 50px;
    height: 50px;
  }
`;

const MyBatchTime = Styled.div`
  position: relative;
  margin-top: 20px;
`;

const PersonLanking = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  margin-top: 80px;
  width: 100%;
`;

const BestPersonTitle = Styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(50)};
  font-weight: 700;
`;

const BestPersons = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'center', 'flex-end')}
  margin-top: 30px;
  padding: 30px;
  border-radius: 12px;
  width: 448px;
  height: 220px;
`;

const firstPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 70%;
  }
`;

const secondPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 45%;
  }
`;

const thirdPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 30%;
  }
`;

const BestPerson = Styled.div`
  ${({ theme }) => theme.flexbox('column')};
  width: 100%;
  margin: 0 1px;
  height: ${props => props.height};
  background-color: #0066ff;

  animation: ${props =>
    props.height === '70%'
      ? firstPlace
      : props.height === '45%'
      ? secondPlace
      : thirdPlace} 1s linear;
`;
