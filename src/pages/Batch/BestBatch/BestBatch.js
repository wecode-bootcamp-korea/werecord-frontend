import React, { useState } from 'react';
import Styled, { keyframes } from 'styled-components';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  const { winner_batch_name, winner_batch_total_time } = winnerInfo;
  const { batch_name, batch_total_time } = myBatchInfo;
  const [firstPrize, secondPrize, thirdPrize] = myBatchInfo.ghost_ranking;
  const [changeBatchInfo, setChangeBatchInfo] = useState(false);
  const best_batchs_time = [780, 1109, 1289];
  const best_batchs_name = ['20기', '21기', '22기'];

  return (
    <Container>
      <MyBatchTime>
        우리 기수 현재
        <br />
        {makeMyBatchTotalTime(batch_total_time)}
      </MyBatchTime>
      <BestBatchTime>
        <SubTitles>최고 기록을 향한 여정</SubTitles>
        <BestBatchs>
          <FirstBatch>
            {best_batchs_time[2]}시간
            <Balloon>{best_batchs_name[0]}</Balloon>
          </FirstBatch>
          <SecondBatch
            width={(best_batchs_time[1] / best_batchs_time[2]) * 100}
          >
            {best_batchs_time[1]}시간
            <Balloon>{best_batchs_name[1]}</Balloon>
          </SecondBatch>
          <ThirdBatch width={(best_batchs_time[0] / best_batchs_time[2]) * 100}>
            {best_batchs_time[0]}시간
            <Balloon>{best_batchs_name[2]}</Balloon>
          </ThirdBatch>
        </BestBatchs>
      </BestBatchTime>
      <PersonRanking>
        <SubTitles>지난주 지박령 순위</SubTitles>
        <GradeInMate>
          <img alt="mate" src="/images/Profile/test1.jpeg" />
          <MateInfo>
            <div className="grade">1위</div>
            <PersonName>
              <div className="name">홍길동</div>
              <div className="hour">89시간</div>
            </PersonName>
          </MateInfo>
        </GradeInMate>
      </PersonRanking>
    </Container>
  );
}

const Container = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-top: 168px;
`;

const MyBatchTime = Styled.section`
  font-size: 60px;
  font-weight: 700;
  line-height: 75px;
  color: ${({ theme }) => theme.colors.white};
`;

const SubTitles = Styled.h1`
  margin-left: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.6;
`;

const BestBatchTime = Styled.section`
  width: 100%;
  margin-top: 61px;
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
  background: ${({ theme }) => theme.colors.purple}
`;

const Balloon = Styled.div`
  position: absolute; 
  top: -70px;
  right: 0;
  width: 52px; 
  height: 52px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.white};

  &:after { 
    border-top: 20px solid ${({ theme }) => theme.colors.white}; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent; 
    border-bottom: 0px solid transparent; 
    content:""; 
    ${({ theme }) => theme.posCenterX('absolute')}
    bottom: -10px;
}
`;

const PersonRanking = Styled.ul`
  margin-top: 42px;
`;

const GradeInMate = Styled.li`
  ${({ theme }) => theme.flexbox('row', 'flex-start')}
  width: 200px;
  height: 92px;
  margin-top: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};

  img {
    width: 52px;
    height: 52px;
    margin-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.purple};
    border-radius: 50%;
  }
`;

const MateInfo = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-left: 10px;

  .grade {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const PersonName = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')};
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.purple};

  .name {
    margin-right: 10px;
    font-weight: normal;
  }
`;

const makeMyBatchTotalTime = batchTotalTime => {
  return `${Math.floor(batchTotalTime / 3600).toLocaleString()}시간 기록 중  `;
};
