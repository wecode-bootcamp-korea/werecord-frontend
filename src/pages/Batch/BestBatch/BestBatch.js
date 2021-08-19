import React from 'react';
import styled from 'styled-components';
import GhostCards from '../GhostCards/GhostCards';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  const { batch_total_time } = myBatchInfo;

  const BEST_BATCHES = winnerInfo.sort(
    (a, b) => b.batch_total_time - a.batch_total_time
  );

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
            {Math.floor(BEST_BATCHES[0].batch_total_time / 3600)}시간
            <FirstBalloon>{BEST_BATCHES[0].batch_name}기</FirstBalloon>
          </FirstBatch>
          <SecondBatch
            width={
              (BEST_BATCHES[1].batch_total_time /
                BEST_BATCHES[0].batch_total_time) *
              100
            }
          >
            {Math.floor(BEST_BATCHES[1].batch_total_time / 3600)}시간
            <SecondBalloon>{BEST_BATCHES[1].batch_name}기</SecondBalloon>
          </SecondBatch>
          <ThirdBatch
            width={
              (BEST_BATCHES[2].batch_total_time /
                BEST_BATCHES[0].batch_total_time) *
              100
            }
          >
            {Math.floor(BEST_BATCHES[2].batch_total_time / 3600)}시간
            <ThirdBalloon>{BEST_BATCHES[2].batch_name}기</ThirdBalloon>
          </ThirdBatch>
        </BestBatchs>
      </BestBatchTime>
      <PersonRanking>
        <SubTitles>지난주 지박령 순위</SubTitles>
        <GhostCards rank={myBatchInfo.ghost_ranking} />
      </PersonRanking>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => theme.flexbox('column', 'center', 'flex-start')};
  margin-top: 94px;
`;

const MyBatchTime = styled.section`
  font-size: 60px;
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 75px;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.mobile`
    font-size: 35px;
    line-height: 35px;
  `}
`;

const SubTitles = styled.span`
  margin-left: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.6;

  ${({ theme }) => theme.mobile`
    font-size: 12px;
  `}
`;

const BestBatchTime = styled.section`
  width: 100%;
  margin-top: 61px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
`;

const BestBatchs = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border-radius: 20px;
  background: black;

  ${({ theme }) => theme.mobile`
    height: 35px;
  `}
`;

const FirstBatch = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding-right: 13px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.purple};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.mobile`
    font-size: 13px;
    line-height: 35px;
  `}

  &:active {
    z-index: 1;
  }
`;

const SecondBatch = styled.div`
  position: absolute;
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  padding-right: 13px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.pink};

  ${({ theme }) => theme.mobile`
    font-size: 13px;
    line-height: 35px;
  `}

  &:active {
    z-index: 1;
  }
`;

const ThirdBatch = styled.div`
  position: absolute;
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  padding-right: 13px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.white};
  text-align: right;
  line-height: 50px;
  background: ${({ theme }) => theme.colors.purple};

  ${({ theme }) => theme.mobile`
    font-size: 13px;
    line-height: 35px;
  `}

  &:active {
    z-index: 1;
  }
`;

const FirstBalloon = styled.div`
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

  ${({ theme }) => theme.mobile`
    width: 40px;
    height: 40px;
    top: -60px;
    font-size: 13px;
    line-height: 40px;
  `}

  &:after {
    border-top: 20px solid ${({ theme }) => theme.colors.white};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    ${({ theme }) => theme.posCenterX('absolute')}
    bottom: -10px;
  }
`;

const SecondBalloon = styled.div`
  position: absolute;
  top: -70px;
  right: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.pink};

  ${({ theme }) => theme.mobile`
    width: 40px;
    height: 40px;
    top: -60px;
    font-size: 13px;
    line-height: 40px;
  `}

  &:after {
    border-top: 20px solid ${({ theme }) => theme.colors.pink};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    ${({ theme }) => theme.posCenterX('absolute')}
    bottom: -10px;
  }
`;

const ThirdBalloon = styled.div`
  position: absolute;
  top: -70px;
  right: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.purple};

  ${({ theme }) => theme.mobile`
    width: 40px;
    height: 40px;
    top: -60px;
    font-size: 13px;
    line-height: 40px;
  `}

  &:after {
    border-top: 20px solid ${({ theme }) => theme.colors.purple};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    ${({ theme }) => theme.posCenterX('absolute')}
    bottom: -10px;
  }
`;

const PersonRanking = styled.section`
  width: 100%;
  margin-top: 42px;
`;

const makeMyBatchTotalTime = batchTotalTime => {
  return `${Math.floor(batchTotalTime / 3600).toLocaleString()}시간 기록 중  `;
};
