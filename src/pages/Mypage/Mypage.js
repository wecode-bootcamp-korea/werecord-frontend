import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import { keyframes } from 'styled-components';
import LineChart from '../Mypage/Charts/LineChart';
import BarChart from '../Mypage/Charts/BarChart';

export default function Mypage() {
  const [userInformation, setUserInformation] = useState('');

  useEffect(() => {
    fetch('data/mypageInformationData.json')
      .then(res => res.json())
      .then(res => {
        setUserInformation(res.result[0]);
      });
  }, []);

  const getInformation = (category, data) => {
    return userInformation[`${category}_information`][`${data}`];
  };

  const getAverageTime = type => {
    const timeToArray =
      userInformation['record_information'][`average_${type}_time`].split(':');
    return `${timeToArray[0]}시 ${timeToArray[1]}분`;
  };

  return (
    <FadeIn transitionDuration={1000}>
      {userInformation && (
        <ContentsContainer>
          <article>
            <UserProfile>
              <Img
                alt="profile_image"
                src={getInformation('user', 'user_profile_image_url')}
              />
              <UserInformation>
                <dt>{getInformation('user', 'user_name')}</dt>
                <EditBtn>Profile Edit</EditBtn>
              </UserInformation>
            </UserProfile>
            <UserSpendingTime>
              <div>
                {getInformation('user', 'user_name')}님은
                <br />
                <TotalspendingHour>
                  총<Hour>{getInformation('user', 'user_total_time')}</Hour>
                  시간
                </TotalspendingHour>
                <br />
              </div>
              &gt; wecode와 <br />
              함께 하셨습니다.
            </UserSpendingTime>
          </article>
          <SecondContents>
            <TimeGraphContents>
              <BarChart margin={50} />
              <LineChart />
            </TimeGraphContents>
            <TimeContents>
              <ul>
                <AverageTimeContent>
                  <Label>내 평균 시작 시간</Label>
                  <Time>{getAverageTime('start')}</Time>
                </AverageTimeContent>
                <AverageTimeContent>
                  <Label>내 평균 종료 시간</Label>
                  <Time>{getAverageTime('end')}</Time>
                </AverageTimeContent>
              </ul>
              <AfterDday>
                <Label>&gt; wecode</Label>
                <Date>+{getInformation('record', 'wecode_d_day')}</Date>
              </AfterDday>
            </TimeContents>
          </SecondContents>
        </ContentsContainer>
      )}
    </FadeIn>
  );
}

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

const EditBtn = styled.dd`
  cursor: pointer;
  padding: 10px 15px;
  transition: background-color 0.3s;

  &:hover {
    border-radius: 5px;
    background-color: #373737;
  }

  &:active {
    opacity: 0.8;
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
`;

const boxAnimation = keyframes`
  from {
    background-color: transparent;
  }
  to{
    background-color: ${({ theme }) => theme.colors.backgroundColor}
  }
`;

const Hour = styled.div`
  display: inline-block;
  margin: 0 15px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  animation-name: ${boxAnimation};
  animation-delay: 0.3s;
  animation-fill-mode: backwards;
  animation-duration: 1s;
`;

const SecondContents = styled.article`
  width: 500px;
  height: 100%;
`;

const TimeGraphContents = styled.div`
  margin-bottom: 80px;

  canvas:first-child {
    margin-bottom: 100px;
  }
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
