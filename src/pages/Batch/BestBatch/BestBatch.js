import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import GhostCards from '../GhostCards/GhostCards';

export default function BestBatch({ winnerInfo, myBatchInfo }) {
  const { batch_total_time } = myBatchInfo;

  const BEST_BATCHES_RANK = winnerInfo.sort(
    (a, b) => b.batch_total_time - a.batch_total_time
  );

  return (
    <Container>
      <MyBatchTime>
        우리 기수 현재
        <br />
        {Math.floor(batch_total_time / 3600)}시간 기록 중
      </MyBatchTime>
      <BestBatchTime>
        <SubTitles>최고 기록을 향한 여정</SubTitles>
        <BestBatchs>
          <Batch
            width={100}
            color={theme.colors.purple}
            bgColor={theme.colors.white}
          >
            {Math.floor(BEST_BATCHES_RANK[0].batch_total_time / 3600)}시간
            <BatchesBalloon bgColor={theme.colors.white}>
              {BEST_BATCHES_RANK[0].batch_name}기
            </BatchesBalloon>
          </Batch>
          <Batch
            width={
              (BEST_BATCHES_RANK[1].batch_total_time /
                BEST_BATCHES_RANK[0].batch_total_time) *
              100
            }
            color={theme.colors.white}
            bgColor={theme.colors.pink}
          >
            {Math.floor(BEST_BATCHES_RANK[1].batch_total_time / 3600)}시간
            <BatchesBalloon bgColor={theme.colors.pink}>
              {BEST_BATCHES_RANK[1].batch_name}기
            </BatchesBalloon>
          </Batch>
          <Batch
            width={
              (BEST_BATCHES_RANK[2].batch_total_time /
                BEST_BATCHES_RANK[0].batch_total_time) *
              100
            }
            color={theme.colors.white}
            bgColor={theme.colors.purple}
          >
            {Math.floor(BEST_BATCHES_RANK[2].batch_total_time / 3600)}시간
            <BatchesBalloon bgColor={theme.colors.purple}>
              {BEST_BATCHES_RANK[2].batch_name}기
            </BatchesBalloon>
          </Batch>
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

const Batch = styled.div`
  position: absolute;
  width: ${({ width }) => `${width}%`};
  height: 100%;
  padding-right: 13px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ color }) => color};
  text-align: right;
  line-height: 50px;
  background: ${({ bgColor }) => bgColor};

  ${({ theme }) => theme.mobile`
    font-size: 13px;
    line-height: 35px;

    &:active {
      z-index: 1;
    }
  `}
`;

const BatchesBalloon = styled.div`
  position: absolute;
  top: -70px;
  right: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  text-align: center;
  background: ${({ bgColor }) => bgColor};

  ${({ theme }) => theme.mobile`
    width: 40px;
    height: 40px;
    top: -60px;
    font-size: 13px;
    line-height: 40px;
  `}

  &:after {
    border-top: 20px solid ${({ bgColor }) => bgColor};
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
