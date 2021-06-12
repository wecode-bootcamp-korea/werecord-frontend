import React from 'react';
import Styled from 'styled-components';

export default function BestBatch() {
  return (
    <LankingArea>
      <BatchLanking>
        <WhoBestBatch>
          <span className="bestBatchTitle">record of legend</span>
          <span className="bestBatchTime">20기 30,000시간 달성</span>
        </WhoBestBatch>
        <MyBatch>
          <div className="myBatch">Wecode 21기</div>
          <div className="myBatchTime">800시간 ing...</div>
        </MyBatch>
      </BatchLanking>
      <PersonLanking>
        <div className="bestPersonTitle">지난주 지박령</div>
        <BestPersons>
          <BestPerson height="45%">김수여2</BestPerson>
          <BestPerson height="70%">김수여이1</BestPerson>
          <BestPerson height="30%">김이3</BestPerson>
        </BestPersons>
      </PersonLanking>
    </LankingArea>
  );
}

const LankingArea = Styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};
  margin-top: 100px;
`;

const BatchLanking = Styled.div`
  display: ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  padding: 20px;
  width: 50%;
`;

const WhoBestBatch = Styled.div`
  height: 110px;
  background-image: url('/images/Profile/ribon.png');
  background-repeat: no-repeat;
  background-size: 100%;

  .bestBatchTitle {
    ${({ theme }) => theme.flexbox('column')};
    padding-top: 10px;
    font-size: ${({ theme }) => theme.pixelToRem(30)};
  }

  .bestBatchTime {
    ${({ theme }) => theme.flexbox('column')};
    margin-top: ${({ theme }) => theme.pixelToRem(20)};
    font-size: ${({ theme }) => theme.pixelToRem(45)};
  }
`;

const MyBatch = Styled.article`
  ${({ theme }) => theme.flexbox('column')};
  margin-top: ${({ theme }) => theme.pixelToRem(43)};
  font-size: ${({ theme }) => theme.pixelToRem(70)};

  .myBatchTime {
    margin-top: 20px;
  }
`;

const PersonLanking = Styled.article`
  ${({ theme }) => theme.flexbox('column', 'center', 'center')};
  width: 50%;

  .bestPersonTitle {
    font-size: ${({ theme }) => theme.pixelToRem(70)};
  }
`;

const BestPersons = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'center', 'flex-end')}
  margin-top: 80px;
  padding: 30px;
  border-radius: 12px;
  width: 448px;
  height: 220px;
  background-color: rgba(222, 222, 222, 0.1);
`;

const BestPerson = Styled.div`
  ${({ theme }) => theme.flexbox('column')};
  width: 30%;
  margin: 0 1px;
  height: ${props => props.height};
  color: #212121;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  background-color: #eedc5b;
`;
