import React, { useState, useEffect } from 'react';
import { keyframes } from 'styled-components';
import FadeIn from 'react-fade-in';
import BarHighChart from './Charts/BarHighChart';
import LineHighChart from './Charts/LineHighChart';
import Modal from '../../components/Modal/Modal';
import EditForm from '../Mypage/EditForm';
import styled from 'styled-components';
import dayjs from 'dayjs';
import API_URLS from '../../config';

export default function Mypage() {
  const [userInformation, setUserInformation] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const currentTime = dayjs().format('HH:mm:ss');

  useEffect(() => {
    fetch(`${API_URLS.MY_PAGE}`, {
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      .then(res => res.json())
      .then(({ result }) => {
        setUserInformation(result);
      });
  }, []);

  const getInformation = (category, data) => {
    return userInformation[`${category}_information`][`${data}`];
  };

  const secondToHour = second => Math.round(second / 360) / 10;

  const convertHourAndMinuteToSeconds = (currentTime, startTime, totalTime) => {
    const [currentHour, currentMinute, currentSecond] = currentTime
      .split(':')
      .map(time => Number(time));
    const [startHour, startMinute, startSecond] = startTime
      .split(':')
      .map(time => Math.round(time));
    const convertedCurrentSecondTime =
      currentHour * 3600 + currentMinute * 60 + currentSecond;
    const convertedStartSecondTime =
      startHour * 3600 + startMinute * 60 + startSecond;

    return totalTime + (convertedCurrentSecondTime - convertedStartSecondTime);
  };

  const getCurrentTotalTime = () => {
    const { start_status, stop_status, user_start_time, user_total_time } =
      userInformation['user_information'];
    if (
      (start_status && stop_status && !user_start_time) ||
      (start_status && !stop_status && !user_start_time)
    )
      return secondToHour(user_total_time);
    if (start_status && !stop_status && user_start_time)
      return secondToHour(
        convertHourAndMinuteToSeconds(
          currentTime,
          user_start_time,
          user_total_time
        )
      );
  };

  const getAverageTime = type => {
    if (userInformation['record_information'][`average_${type}_time`] === 0) {
      return `0시 0분`;
    } else {
      const hour = Number(
        userInformation['record_information'][`average_${type}_time`].split(
          ':'
        )[0]
      );
      const minute =
        userInformation['record_information'][`average_${type}_time`].split(
          ':'
        )[1];

      if (hour < 10) {
        return `오전 0${hour}시 ${minute}분`;
      } else if (hour >= 10 && hour < 12) {
        return `오전 ${hour}시 ${minute}분`;
      }
      if (hour === 12) {
        return `오후 ${hour}시 ${minute}분`;
      } else if (hour > 12 && hour < 22) {
        return `오후 0${hour - 12}시 ${minute}분`;
      } else if (hour >= 22) {
        return `오후 ${hour - 12}시 ${minute}분`;
      }
    }
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
                <EditBtn onClick={() => setIsModalOn(true)}>Edit</EditBtn>
                {isModalOn && (
                  <Modal setOff={setIsModalOn}>
                    <EditForm />
                  </Modal>
                )}
              </UserInformation>
            </UserProfile>
            <UserSpendingTime>
              <TotalspendingHour>
                총<Hour>{getCurrentTotalTime()}</Hour>
                시간
              </TotalspendingHour>
              <br />
              <TotalWecode>&gt; wecode와</TotalWecode>
              <TotalWecode>함께 하셨습니다.</TotalWecode>
            </UserSpendingTime>
            <TimeContents>
              <div>
                <AverageTimeContent>
                  <Label>⏳ 내 평균 시작 시간</Label>
                  <Time>{getAverageTime('start')}</Time>
                </AverageTimeContent>
                <AverageTimeContent>
                  <Label>⌛ 내 평균 종료 시간</Label>
                  <Time>{getAverageTime('end')}</Time>
                </AverageTimeContent>
              </div>
              <AfterDday>
                <Label>&gt; wecode</Label>
                <Date>D+{getInformation('record', 'wecode_d_day')}</Date>
              </AfterDday>
            </TimeContents>
          </article>
          <SecondContents>
            <TimeGraphContents>
              <BarHighChart
                weeklyRecordsData={getInformation('record', 'weekly_record')}
              />
              <LineHighChart
                totalAccumulateRecordsData={getInformation(
                  'record',
                  'total_accumulate_records'
                )}
              />
            </TimeGraphContents>
          </SecondContents>
        </ContentsContainer>
      )}
    </FadeIn>
  );
}

const ContentsContainer = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  margin: 80px auto 0;
  padding: 40px 150px 0;
  max-width: 1440px;
  transform: scale(1.05);

  article:first-child {
    height: 100%;
  }

  ${({ theme }) => theme.tablet` 
  ${({ theme }) => theme.flexbox('column')}
  padding: 0;
  width: 300px;
  `}
`;

const UserProfile = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom: 60px;

  ${({ theme }) => theme.tablet` 
  ${({ theme }) => theme.flexbox('row', 'center')}
  margin-top: 30px;
  `}
`;

const Img = styled.img`
  margin-right: 25px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInformation = styled.dl`
  dt {
    margin-bottom: 17px;
    position: relative;
    top: 10px;
    font-size: ${({ theme }) => theme.pixelToRem(25)};
    font-weight: 700;

    ${({ theme }) => theme.middle_desktop`
      font-size: 20px;
    `}
  }
`;

const EditBtn = styled.dd`
  padding-left: 1px;
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  ${({ theme }) => theme.middle_desktop`
    font-size: 11px;
  `}
`;

const UserSpendingTime = styled.div`
  margin-bottom: 80px;
  font-size: ${({ theme }) => theme.pixelToRem(50)};
  font-weight: 700;
  line-height: ${({ theme }) => theme.pixelToRem(70)};

  ${({ theme }) => theme.middle_desktop`
    font-size: 30px;
    line-height: 40px;
  `}

  ${({ theme }) => theme.tablet` 
    display: none;  
  `}
`;

const TotalspendingHour = styled.div`
  display: inline-block;
  margin: 35px 0 30px;
  padding: 0 10px 0 0;
  font-size: ${({ theme }) => theme.pixelToRem(80)};

  ${({ theme }) => theme.middle_desktop`
    margin: 0;
    font-size: 50px;
  `}
`;

const TotalWecode = styled.div`
  font-size: 40px;
  line-height: 58px;

  ${({ theme }) => theme.middle_desktop`
    font-size: 30px;
  `}
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
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  animation-name: ${boxAnimation};
  animation-delay: 0.3s;
  animation-fill-mode: backwards;
  animation-duration: 1s;

  ${({ theme }) => theme.tablet` 
  padding: 0px 5px;
  `}
`;

const SecondContents = styled.article`
  width: 500px;
  height: 100%;

  ${({ theme }) => theme.middle_desktop`
    width: 330px
  `}

  ${({ theme }) => theme.tablet` 
    position: relative;
    transform: scale(0.6);
    height: 300px;
  `}
`;

const TimeGraphContents = styled.div`
  div:first-child {
    margin-bottom: 30px;
  }
`;

const AverageTimeContent = styled.div`
  margin-bottom: 40px;
  margin-right: 100px;

  ${({ theme }) => theme.middle_desktop`
    margin-right: 50px;
  `}

  ${({ theme }) => theme.tablet` 
    margin-right: 0;
  `}
`;

const TimeContents = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};

  ${({ theme }) => theme.tablet` 
  ${({ theme }) => theme.flexbox()}
  `}
`;

const Label = styled.div`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(23)};
  text-align: center;
  font-weight: 700;

  ${({ theme }) => theme.middle_desktop`
    font-size: 18px;
  `}
`;

const Time = styled(Label.withComponent('div'))`
  font-weight: 400;
  padding-left: 15px;
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(80)};
  font-weight: 700;

  ${({ theme }) => theme.middle_desktop`
    font-size: 50px;
  `}
`;

const AfterDday = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')};

  ${({ theme }) => theme.tablet` 
  display: none;
  `}
`;
