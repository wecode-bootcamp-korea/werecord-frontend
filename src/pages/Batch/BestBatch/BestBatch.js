import React, { useState } from 'react';
import Styled, { keyframes } from 'styled-components';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  const { winner_batch_name, winner_batch_total_time } = winnerInfo;
  const { batch_name, batch_total_time } = myBatchInfo;
  const [firstPrize, secondPrize, thirdPrize] = myBatchInfo.ghost_ranking;
  const [changeBatchInfo, setChangeBatchInfo] = useState(false);

  return (
    <>
      <Container>
        <RankingArea>
          <WhoBestBatch>
            <div>
              <BestBatchTitle>&gt; Record of Legend</BestBatchTitle>
            </div>
            <BestBatchTime>
              {makeWinnerTotalTime(winner_batch_name, winner_batch_total_time)}
            </BestBatchTime>
          </WhoBestBatch>
          <BatchRanking>
            <MyBatch>
              <div>
                <MybatchText>&gt; wecode </MybatchText>
                <MybatchNumber> {`${batch_name}기`}</MybatchNumber>
              </div>
              <MyBatchTime>
                {makeMyBatchTotalTime(batch_total_time)}
              </MyBatchTime>
            </MyBatch>
          </BatchRanking>
        </RankingArea>
        <PersonRanking>
          <BestPersonTitle>지난주 지박령</BestPersonTitle>
          <BestPersons>
            {!firstPrize && (
              <PrizeGuide>
                👻 다음주에 첫 지박령 순위가 발표될 예정입니다!
              </PrizeGuide>
            )}
            {secondPrize && (
              <BestPerson rank={2}>
                <BestGrade>{secondPrize.user_name}님</BestGrade>
                <p>🥈</p>
              </BestPerson>
            )}
            {firstPrize && (
              <BestPerson rank={1}>
                <BestGrade>{firstPrize.user_name}님</BestGrade>
                <p>🥇</p>
              </BestPerson>
            )}
            {thirdPrize && (
              <BestPerson rank={3}>
                <BestGrade>{thirdPrize.user_name}님</BestGrade>
                <p>🥉</p>
              </BestPerson>
            )}
          </BestPersons>
        </PersonRanking>
      </Container>

      <TabletContainer onClick={() => setChangeBatchInfo(!changeBatchInfo)}>
        {changeBatchInfo ? (
          <BatchRanking>
            <MyBatch>
              <div>
                <MybatchText>&gt; wecode </MybatchText>
                <MybatchNumber> {`${batch_name}기`}</MybatchNumber>
              </div>
              <MyBatchTime>
                {makeMyBatchTotalTime(batch_total_time)}
              </MyBatchTime>
            </MyBatch>
          </BatchRanking>
        ) : (
          <PersonRanking>
            <BestPersonTitle>지난주 지박령</BestPersonTitle>
            <BestPersons>
              {!firstPrize && (
                <PrizeGuide>
                  👻 다음주에 첫 지박령 순위가 발표될 예정입니다!
                </PrizeGuide>
              )}
              {secondPrize && (
                <BestPerson rank={2}>
                  <BestGrade>{secondPrize.user_name}님</BestGrade>
                  <p>🥈</p>
                </BestPerson>
              )}
              {firstPrize && (
                <BestPerson rank={1}>
                  <BestGrade>{firstPrize.user_name}님</BestGrade>
                  <p>🥇</p>
                </BestPerson>
              )}
              {thirdPrize && (
                <BestPerson rank={3}>
                  <BestGrade>{thirdPrize.user_name}님</BestGrade>
                  <p>🥉</p>
                </BestPerson>
              )}
            </BestPersons>
          </PersonRanking>
        )}
      </TabletContainer>
    </>
  );
}

const Container = Styled.div`
  ${({ theme }) => theme.flexbox()};
  margin-top:100px ;
  margin-bottom:50px;

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const RankingArea = Styled.section`
  ${({ theme }) => theme.flexbox('column', 'space-between', 'flex-start')};
  margin-right:90px;
`;

const BatchRanking = Styled.div`
  display: ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  padding: 20px;
`;

const WhoBestBatch = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-top: 80px;
  margin-bottom:80px;
  height: 50px;

  div{
  ${({ theme }) => theme.flexbox()};
  }

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const BestBatchTitle = Styled.span`
  ${({ theme }) => theme.flexbox('column')};
  margin-left:20px;
  padding: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  background-color: #FF9800;
`;

const BestBatchTime = Styled.span`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  left:50px;
  top:-10px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  margin-left:40px;
  font-weight: 700;
  padding:10px;
  background-color:white;
  color:black;
`;

const MyBatch = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'flex-start')};
  margin-top: ${({ theme }) => theme.pixelToRem(25)};
  margin-bottom: 30px;
  font-weight: 700;

  div{
  ${({ theme }) => theme.flexbox()};
  }

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  `}
`;

const MybatchText = Styled.div`
  font-size: 60px;
  margin-right: 10px;

  ${({ theme }) => theme.tablet`
    margin-right: 5px;
    font-size: 30px;
  `}
  `;

const MybatchNumber = Styled.div`
  font-size: 60px;
  background-color: ${({ theme }) => theme.colors.blue};
  padding:10px;

  ${({ theme }) => theme.tablet`
    font-size: 30px;
  `}
`;

const MyBatchTime = Styled.div`
  position: relative;
  margin-top: 20px;

  ${({ theme }) => theme.tablet`
    margin-top: 10px;
    font-size: 30px;
  `}
`;

const PersonRanking = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  margin-top: 80px;
  width: 50%;

  ${({ theme }) => theme.tablet`
    width: 100vw;
    margin-top: 50px;
  `}
`;

const BestPersonTitle = Styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(38)};
  margin-bottom : 30px;
  font-weight: 700;

  ${({ theme }) => theme.tablet`
    font-size: 30px;
  `}
`;

const BestGrade = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-around', 'center')};
  font-size: 20px;
  position: relative;
  top: -60%;

  ${({ theme }) => theme.tablet`
    font-size: 14px;
  `}
`;

const BestPersons = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'center', 'flex-end')}
  margin-top: 30px;
  padding: 30px;
  border-radius: 12px;
  width: 448px;
  height: 220px;

  ${({ theme }) => theme.tablet`
    width: 100vw;
    height: 160px;
    margin-top: 0;
  `}
`;

const PrizeGuide = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  line-height: 15;
  font-size: 14px;
`;

const firstPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 90%;
  }
`;

const secondPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 55%;
  }
`;

const thirdPlace = keyframes`
  0% {
    height: 0%;
  }
  100% {
    height: 40%;
  }
`;

const BestPerson = Styled.div`
  ${({ theme }) => theme.flexbox('column')};
  width: 100%;
  margin: 0 1px;
  font-size:35px;
  font-weight:700;
  height: ${props =>
    props.rank === 1 ? '90%' : props.rank === 2 ? '55%' : '40%'};
  background-color: #0066ff;
  animation: ${props =>
    props.rank === 1
      ? firstPlace
      : props.rank === 2
      ? secondPlace
      : thirdPlace} 1s linear;

      p {
        position: relative;
        top:-10px;

        ${({ theme }) => theme.tablet`
          font-size: 25px;
        `}
      }
`;

const TabletContainer = Styled.section`
  ${({ theme }) => theme.flexbox()};
  display: none;
  margin-top: 50px ;
  margin-bottom: 50px;

  ${({ theme }) => theme.tablet`
    display: block;
    ${({ theme }) => theme.flexbox()};
  `}
`;

const makeWinnerTotalTime = (batchName, batchTotalTime) => {
  return `${batchName}기 ${Math.floor(
    batchTotalTime / 3600
  ).toLocaleString()}시간 달성 !`;
};

const makeMyBatchTotalTime = batchTotalTime => {
  return `🔥 ${Math.floor(
    batchTotalTime / 3600
  ).toLocaleString()}시간 기록 중  `;
};
