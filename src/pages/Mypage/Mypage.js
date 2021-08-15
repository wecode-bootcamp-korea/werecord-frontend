import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import BarHighChart from './Charts/BarHighChart';
import LineHighChart from './Charts/LineHighChart';
import Modal from '../../components/Modal/Modal';
import EditForm from '../Mypage/EditForm';
import styled from 'styled-components';
import dayjs from 'dayjs';
import findDefaultImg from '../Util/findDefaultImg';
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
      .then(({ result, message }) => {
        if (message === 'REFRESH_TOKEN_EXPIRED') {
          sessionStorage.clear();
          window.location.href = '/';
        } else {
          setUserInformation(result);
        }
      });
  }, []);

  const getInformation = (category, data) => {
    return userInformation[`${category}_information`][`${data}`];
  };

  const secondToHourAndMinute = second => {
    let hour = Math.floor(second / 3600);
    let minute = Math.floor((second % 3600) / 60);

    return [hour, minute];
  };

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
      ((start_status || !start_status) && stop_status && !user_start_time) ||
      ((start_status || !start_status) && !stop_status && !user_start_time)
    )
      return secondToHourAndMinute(user_total_time);

    if (start_status && !stop_status && user_start_time)
      return secondToHourAndMinute(
        convertHourAndMinuteToSeconds(
          currentTime,
          user_start_time,
          user_total_time
        )
      );
  };

  const getAverageTime = type => {
    if (userInformation['record_information'][`average_${type}_time`] === 0) {
      return `00:00`;
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
        return `AM 0${hour}:${minute}`;
      } else if (hour >= 10 && hour < 12) {
        return `AM ${hour}:${minute}`;
      }
      if (hour === 12) {
        return `PM ${hour}:${minute}`;
      } else if (hour > 12 && hour < 22) {
        return `PM 0${hour - 12}:${minute}`;
      } else if (hour >= 22) {
        return `PM ${hour - 12}:${minute}`;
      }
    }
  };

  return (
    <FadeIn transitionDuration={1000}>
      {userInformation && (
        <ContentsContainer>
          <UserProfile>
            <Img
              alt="profile_image"
              src={findDefaultImg(
                getInformation('user', 'user_profile_image_url')
              )}
            />
            <UserInformation>
              <UserName>{getInformation('user', 'user_name')}</UserName>
              <EditBtn onClick={() => setIsModalOn(true)}>edit</EditBtn>
              {isModalOn && (
                <Modal setOff={setIsModalOn}>
                  <EditForm />
                </Modal>
              )}
            </UserInformation>
          </UserProfile>
          <UserSpendingTime>
            <TotalspendingHour>
              위코드와 함께 한<br />
              {getCurrentTotalTime()[0] > 0 &&
                `${getCurrentTotalTime()[0]}시간`}{' '}
              {getCurrentTotalTime()[0] > 0
                ? `${getCurrentTotalTime()[1]}분`
                : `${getCurrentTotalTime()[1]}분`}
            </TotalspendingHour>
            <TimeContents>
              <AfterDday>
                D+{getInformation('record', 'wecode_d_day')}
              </AfterDday>
              <AverageTimeContent>
                <Label>내 평균 시작 시간</Label>
                <Time>{getAverageTime('start')}</Time>
              </AverageTimeContent>
              <AverageTimeContent>
                <Label>내 평균 종료 시간</Label>
                <Time>{getAverageTime('end')}</Time>
              </AverageTimeContent>
            </TimeContents>
          </UserSpendingTime>
          <TimeGraphContents>
            <StyledChart>
              <YAxisTitle>시간</YAxisTitle>
              <BarHighChart
                weeklyRecordsData={getInformation('record', 'weekly_record')}
              />
            </StyledChart>
            <StyledChart>
              <YAxisTitle>시간</YAxisTitle>
              <LineHighChart
                totalAccumulateRecordsData={getInformation(
                  'record',
                  'total_accumulate_records'
                )}
              />
            </StyledChart>
          </TimeGraphContents>
        </ContentsContainer>
      )}
    </FadeIn>
  );
}

const ContentsContainer = styled.section`
  max-width: 1440px;
  position: relative;
  margin: 94px auto;
  padding: 0 200px;
  z-index: 100;

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')};
    padding: 0;
  `}
`;

const UserProfile = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')};
`;

const Img = styled.img`
  margin-right: 16px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInformation = styled.div``;

const UserName = styled.div`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};
`;

const EditBtn = styled.dd`
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  color: ${({ theme }) => theme.colors.fontColorWhite};
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    text-underline-position: under;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }
`;

const UserSpendingTime = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'flex-start')};
  width: 100%;
  margin-top: 30px;

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')};
  `}
`;

const TotalspendingHour = styled.div`
  width: 47%;
  font-size: ${({ theme }) => theme.pixelToRem(60)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 75px;
  color: ${({ theme }) => theme.colors.fontColorWhite};

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('row')};
    width: 100%;
    font-size: ${({ theme }) => theme.pixelToRem(45)};
  `}
`;

const TimeGraphContents = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  margin-top: 60px;

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')};
    width: 80%;
  `}
`;

const TimeContents = styled.div`
  width: 47%;
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')};
    margin-top: 40px;
  `}
`;

const Label = styled.div`
  margin-top: 2px;
  margin-right: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  color: ${({ theme }) => theme.colors.fontColorWhite};
  opacity: 0.6;
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};
`;

const AfterDday = styled.div`
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(60)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorWhite};
`;

const AverageTimeContent = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')};
  margin-bottom: 21px;
`;

const StyledChart = styled.div`
  position: relative;
  width: 47%;

  ${({ theme }) => theme.tablet`
    width: 100%;
  `}
`;

const YAxisTitle = styled.div`
  ${({ theme }) => theme.posCenterY('absolute')};
  left: -20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transform: rotate(-90deg);
`;
