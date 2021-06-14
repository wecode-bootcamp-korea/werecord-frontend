import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import { keyframes } from 'styled-components';
import LineChart from '../Mypage/Charts/LineChart';
import BarChart from '../Mypage/Charts/BarChart';

export default function Mypage() {
  const [hour, setHour] = useState(0);
  const [days, setDays] = useState(0);
  const [userInformation, setUserInformation] = useState('');
  const [checkTime, setCheckTime] = useState({
    '내 평균 시작 시간': '9시 30분',
    '내 평균 종료 시간': '9시 30분',
  });

  return (
    <FadeIn delay={100} transitionDuration={1000}>
      <ContentsContainer>
        <article>
          <UserProfile>
            <Img
              alt="profile_image"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            />
            <UserInformation>
              <dt>전용민</dt>
              <dd>Profile Edit</dd>
            </UserInformation>
          </UserProfile>
          <UserSpendingTime>
            <div>
              전용민님은
              <br />
              <TotalspendingHour>총 {hour}시간</TotalspendingHour>
              <br />
            </div>
            &gt; wecode와 <br />
            함께 하셨습니다.
          </UserSpendingTime>
        </article>
        <SecondContents>
          <TimeGraphContents>
            <BarChart />
            <LineChart />
          </TimeGraphContents>
          <TimeContents>
            <ul>
              {Object.keys(checkTime).map((key, index) => {
                return (
                  <AverageTimeContent key={index}>
                    <Label>{key}</Label>
                    <Time>{checkTime[key]}</Time>
                  </AverageTimeContent>
                );
              })}
            </ul>
            <AfterDday>
              <Label>&gt; wecode</Label>
              <Date>+{days}</Date>
            </AfterDday>
          </TimeContents>
        </SecondContents>
      </ContentsContainer>
    </FadeIn>
  );
}

const boxAnimation = keyframes`
 from {
   width:0;
 }
 to {
   width: 280px
 }
 `;

const ContentsContainer = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  margin: 120px auto 0;
  padding: 52px 75px;
  max-width: 1440px;
`;

const UserProfile = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom: 70px;
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
  font-weight: 700;
  line-height: ${({ theme }) => theme.pixelToRem(122)};

  div:first-child {
    margin-bottom: 25px;
  }
`;

const TotalspendingHour = styled.div`
  display: inline-block;
  position: relative;
  padding: 5px 10px;

  &:after {
    display: block;
    position: absolute;
    content: '';
    width: 280px;
    height: 100px;
    left: -6px;
    bottom: 15px;
    background-color: ${({ theme }) => theme.colors.blue};
    z-index: -1;
    animation-name: ${boxAnimation};
    animation-duration: 1000ms;
  }
`;

const SecondContents = styled.article`
  width: 500px;
  height: 500px;
`;

const TimeGraphContents = styled.div`
  margin-bottom: 80px;
`;

const AverageTimeContent = styled.li`
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
`;

const TimeContents = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')}
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  text-align: center;
  font-weight: 700;
`;

const Time = styled(Label.withComponent('div'))`
  font-weight: 400;
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(100)};
`;

const AfterDday = styled.div`
  ${({ theme }) => theme.flexbox('column')}
`;
