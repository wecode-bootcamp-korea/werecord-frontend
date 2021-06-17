import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import API_URLS from '../../config';
import IMAGES from './IMAGES';

export default function MentorPage({ history }) {
  const [batchInformation, setBatchInformation] = useState([]);

  const goToBatchPage = id => {
    history.push(`/batch/${id}`);
  };

  useEffect(() => {
    fetch('/data/MentorPageData.json')
      // fetch(`${API_URLS.MENTOR_PAGE}`, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: localStorage.getItem('wrtoken'),
      //   },
      // })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'UNAUTHORIZED_USER_ERROR') {
          alert('접근 권한이 없습니다!');
          history.push('/mypage');
        } else {
          setBatchInformation(res.result);
        }
      })
      .catch(() => {
        alert('로그인이 필요합니다!');
        history.push('/');
      });
  }, []);

  return (
    <FadeIn>
      <ContentsContainer>
        <Title>진행중인 기수 현황</Title>
        <BatchInformationContainer>
          {batchInformation &&
            batchInformation.map((batch, index) => {
              const {
                batch_id,
                batch_name,
                batch_start_day,
                batch_end_day,
                batch_total_time,
                wecode_d_day,
                batch_on_user_number,
                batch_total_user_number,
              } = batch;
              return (
                <List key={index}>
                  <Contents
                    images={getRandomImage(IMAGES)}
                    onClick={() => {
                      goToBatchPage(batch_id);
                    }}
                  >
                    <BatchName>{batch_name}기</BatchName>
                    <AfterDday>D + {wecode_d_day}</AfterDday>
                    <StartDay>시작일: {batch_start_day}</StartDay>
                    <EndDay>종료일: {batch_end_day}</EndDay>
                    <TotalTime>
                      누적: {convertSecondsToHours(batch_total_time)} 시간
                    </TotalTime>
                    <BatchOnUser>
                      <UserStatus>현재 출석 현황: </UserStatus>
                      <OnUser count={batch_on_user_number}>
                        {batch_on_user_number}
                      </OnUser>
                      <Slash>/</Slash>
                      <TotalUser>{batch_total_user_number}</TotalUser>
                    </BatchOnUser>
                  </Contents>
                </List>
              );
            })}
        </BatchInformationContainer>
      </ContentsContainer>
    </FadeIn>
  );
}

const getRandomImage = arr => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const convertSecondsToHours = seconds => {
  return Math.round(seconds / 360) / 10;
};

const ContentsContainer = styled.section`
  ${({ theme }) => theme.flexbox('column')}
  margin: 80px auto 0;
  padding: 60px;
  max-width: 1440px;
`;

const Title = styled.h1`
  margin-bottom: 80px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.pixelToRem(35)};
`;

const BatchInformationContainer = styled.ul`
  ${({ theme }) => theme.flexbox()}
`;

const List = styled.li`
  margin: 0 30px;
`;

const Contents = styled.dl`
  ${({ theme }) => theme.flexbox('column', 'center', 'start')}
  padding: 20px;
  position: relative;
  width: 400px;
  height: 550px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  text-align: left;
  transition: 0.3s transform, 0.3s box-shadow, 0.2s opacity;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url(${({ images }) => images});
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.05;
  }

  dt {
    transition: 0.3s background-color;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 25px 0px rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    cursor: pointer;

    dt {
      background-color: #0066ff;
    }
  }

  &:active {
    opacity: 0.7;
  }
`;

const BatchName = styled.dt`
  margin-bottom: 30px;
  padding: 10px;
  position: relative;
  left: 200px;
  bottom: 50px;
  font-size: ${({ theme }) => theme.pixelToRem(60)};
  font-weight: 700;
`;

const AfterDday = styled.dd`
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(40)};
`;

const StartDay = styled.dd`
  margin-bottom: 15px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
`;

const EndDay = styled(StartDay.withComponent('dd'))`
  margin-bottom: 50px;
`;

const TotalTime = styled.dd`
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
`;

const BatchOnUser = styled.dd`
  ${({ theme }) => theme.flexbox()}
  font-size: ${({ theme }) => theme.pixelToRem(25)};
`;

const UserStatus = styled.div`
  margin-right: 15px;
`;

const OnUser = styled.div`
  margin-right: 20px;
  color: ${({ theme, count }) =>
    count === 0 ? theme.colors.red : theme.colors.green};
  font-weight: bold;
`;

const Slash = styled.div`
  margin-right: 20px;
`;

const TotalUser = styled.div`
  font-weight: bold;
`;
