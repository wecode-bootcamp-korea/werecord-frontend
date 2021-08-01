import React, { useState } from 'react';
import Styled, { keyframes } from 'styled-components';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  const { winner_batch_name, winner_batch_total_time } = winnerInfo;
  const { batch_name, batch_total_time } = myBatchInfo;
  const [firstPrize, secondPrize, thirdPrize] = myBatchInfo.ghost_ranking;
  const [changeBatchInfo, setChangeBatchInfo] = useState(false);
  const best_batchs_time = [780, 1109, 1289];

  return (
    <Container>
      <MyBatchTime>
        우리 기수 현재
        <br />
        {makeMyBatchTotalTime(batch_total_time)}
      </MyBatchTime>
      <BestBatchTime>
        <h1>최고 기록을 향한 여정</h1>
        <BestBatchs>
          <FirstBatch>{best_batchs_time[2]}시간</FirstBatch>
          <SecondBatch
            width={(best_batchs_time[1] / best_batchs_time[2]) * 100}
          >
            {best_batchs_time[1]}시간
          </SecondBatch>
          <ThirdBatch width={(best_batchs_time[0] / best_batchs_time[2]) * 100}>
            {best_batchs_time[0]}시간
          </ThirdBatch>
        </BestBatchs>
      </BestBatchTime>
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
              <BestGrade>
                {secondPrize.user_name}님
                <BestGradeTime>
                  {`${Math.floor(
                    secondPrize.user_last_week_total_time / 3600
                  )}시간`}
                </BestGradeTime>
              </BestGrade>
              <p>🥈</p>
            </BestPerson>
          )}
          {firstPrize && (
            <BestPerson rank={1}>
              <BestGrade>
                {firstPrize.user_name}님
                <BestGradeTime>
                  {`${Math.floor(
                    firstPrize.user_last_week_total_time / 3600
                  )}시간`}
                </BestGradeTime>
              </BestGrade>
              <p>🥇</p>
            </BestPerson>
          )}
          {thirdPrize && (
            <BestPerson rank={3}>
              <BestGrade>
                {thirdPrize.user_name}님
                <BestGradeTime>
                  {`${Math.floor(
                    thirdPrize.user_last_week_total_time / 3600
                  )}시간`}
                </BestGradeTime>
              </BestGrade>
              <p>🥉</p>
            </BestPerson>
          )}
        </BestPersons>
      </PersonRanking>
    </Container>
  );
}

const Container = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-top: 168px;
`;

const BestBatchTime = Styled.div`
  width: 100%;
  margin-top: 61px;

  h1 {
    font-size: ${({ theme }) => theme.pixelToRem(15)};
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.6;
  }
  ${({ theme }) => theme.flexbox('column')};
  font-size: ${({ theme }) => theme.pixelToRem(30)};
`;

const BestBatchs = Styled.div`
  position: relative;
  width: 100%;
  height: 50px; 
  margin-top: 20px;
  border-radius: 20px;
  background: black;
`;

const FirstBatch = Styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-right: 17px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.blue};
`;

const SecondBatch = Styled.div`
  position: absolute;
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  padding-right: 17px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.red};
`;

const ThirdBatch = Styled.div`
  position: absolute;
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  padding-right: 17px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.green}
`;

const MyBatchTime = Styled.div`
  font-size: 60px;
  font-weight: 700;
  line-height: 75px;
`;

const PersonRanking = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  margin-top: 80px;

  ${({ theme }) => theme.tablet`
    width: 100vw;
    margin-top: 50px;
  `}
`;

const BestPersonTitle = Styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(38)};
  margin-bottom : 30px;
  font-weight: 700;

  ${({ theme }) => theme.middle_desktop`
    font-size: 23px;
  `}

  ${({ theme }) => theme.tablet`
    font-size: 30px;
  `}
`;

const BestGrade = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-around', 'flex-end')};
  position: relative;
  top: -60%;
  font-size: 18px;

  ${({ theme }) => theme.tablet`
    font-size: 14px;
  `}
`;

const BestGradeTime = Styled.div`
  margin-left: 3px;
  font-size: 12px;

  ${({ theme }) => theme.middle_desktop`
    font-size: 10px;
  `}
`;

const BestPersons = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'center', 'flex-end')}
  margin-top: 30px;
  padding: 30px;
  border-radius: 12px;
  width: 448px;
  height: 220px;

  .firstPrizeTotalTime {
    font-size: 20px;
  }

  ${({ theme }) => theme.middle_desktop`
    width: 290px;
    height: 170px;
  `}

  ${({ theme }) => theme.tablet`
    width: 100vw;
    height: 130px;
    margin-top: 20px;
    padding: 0 30px;;
  `}
`;

const PrizeGuide = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  line-height: 15;
  font-size: 18px;
  font-weight: 700;
  
  ${({ theme }) => theme.middle_desktop`
    font-size: 14px;
  `}

  ${({ theme }) => theme.tablet`
    font-size: 10px;
  `}
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
  font-size: 35px;
  font-weight: 700;
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

        ${({ theme }) => theme.middle_desktop`
          font-size: 30px;
        `}

        ${({ theme }) => theme.tablet`
          font-size: 25px;
        `}
      }
`;

const makeWinnerTotalTime = (batchName, batchTotalTime) => {
  return `${batchName}기 ${Math.floor(
    batchTotalTime / 3600
  ).toLocaleString()}시간 달성 !`;
};

const makeMyBatchTotalTime = batchTotalTime => {
  return `${Math.floor(batchTotalTime / 3600).toLocaleString()}시간 기록 중  `;
};
