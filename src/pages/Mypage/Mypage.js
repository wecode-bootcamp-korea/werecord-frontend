import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Mypage() {
  const [hour, setHour] = useState(0);
  const [days, setDays] = useState(0);
  const [userInformation, setUserInformation] = useState('');
  const [checkTime, setCheckTime] = useState({
    '내 평균 출근 시간': '9시 30분',
    '내 평균 퇴근 시간': '9시 30분',
  });

  return (
    <ContentsContainer>
      <FirstContents>
        <UserProfile>
          <Img
            alt="profile_image"
            src="https://user-images.githubusercontent.com/75535651/121650104-33733d80-cad4-11eb-9103-844f3be71982.png
"
          />
          <UserInformation>
            <dt>이다슬</dt>
            <dd>Profile Edit</dd>
          </UserInformation>
        </UserProfile>
        <UserSpendingTime>
          이다슬님은
          <br />
          <TotalspendingHour>총 50시간</TotalspendingHour>
          <br />
          &gt; WECODE와 <br />
          함께 하셨습니다.
        </UserSpendingTime>
      </FirstContents>
      <SecondContents>
        <TimeGraphContents>
          <WeekendGraph />
          <WholeTimeGraph />
        </TimeGraphContents>
        <TimeContents>
          <AverageTimeList>
            {Object.keys(checkTime).map((key, index) => {
              return (
                <AverageTimeContent key={index}>
                  <Label>{key}</Label>
                  <Time>{checkTime[key]}</Time>
                </AverageTimeContent>
              );
            })}
          </AverageTimeList>
          <AfterDday>
            <Label>&gt; wecode</Label>
            <Date>+9</Date>
          </AfterDday>
        </TimeContents>
      </SecondContents>
    </ContentsContainer>
  );
}

const ContentsContainer = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  margin-top: 60px;
  /* margin-top: 120px; */
  padding: 87px 181px 0;
  border-top: 1px solid white;
  max-width: 1920px;
`;

const FirstContents = styled.article``;

const UserProfile = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom: 85px;
`;

const Img = styled.img`
  margin-right: 26px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const UserInformation = styled.dl`
  text-align: center;

  dt {
    margin-bottom: 15px;
    font-size: ${({ theme }) => theme.pixelToRem(35)};
    font-weight: 700;
  }
`;

const UserSpendingTime = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(70)};
  line-height: ${({ theme }) => theme.pixelToRem(122)};
`;

const TotalspendingHour = styled.div`
  display: inline-block;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.blue};
`;

const SecondContents = styled.article`
  width: 500px;
  height: 500px;
`;

const TimeGraphContents = styled.div`
  margin-bottom: 60px;
`;

const WeekendGraph = styled.div``;

const AverageTimeList = styled.ul``;

const AverageTimeContent = styled.li`
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
`;

const WholeTimeGraph = styled.div``;

const TimeContents = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')}
`;

const Label = styled.div`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(35)};
`;

const Time = styled(Label.withComponent('div'))``;

const AfterDday = styled.div``;

const Date = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(100)};
`;
