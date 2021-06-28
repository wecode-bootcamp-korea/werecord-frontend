import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import API_URLS from '../../config';
import IMAGES from './IMAGES';
import Modal from '../../components/Modal/Modal';
import EditBatchInfoFrom from './EditBatchInfoForm';
import DeleteBatchInfoForm from './DeleteBatchInfoForm';

export default function MentorPage({ history }) {
  const [batchInformation, setBatchInformation] = useState([]);
  const [deleteBatchNumber, setDeleteBatchNumber] = useState(0);
  const [deleteBatchInformation, setDeleteBatchInformation] = useState(false);
  const [editBatchInformation, setEditBatchInformation] = useState(false);
  const [prevBatchInformation, setPrevBatchInformation] = useState({});
  const sliderList = useRef();
  const count = useRef(0);
  const goToBatchPage = id => {
    history.push(`/batch/${id}`);
  };

  useEffect(() => {
    fetch(`${API_URLS.MENTOR_PAGE}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      // fetch('data/MentorPageData.json')
      .then(res => res.json())
      .then(res => {
        if (res.message === 'LOGIN_REQUIRED') {
          alert('접근 권한이 없습니다!');
          history.push('/mypage');
        } else {
          setBatchInformation(res.result);
        }
      })
      .catch(() => {
        alert('관리자에게 문의바랍니다!');
        history.push('/');
      });
  }, []);

  const getRandomImage = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // 슬라이더 로직 - 시작
  const goToPrevious = () => {
    if (window.outerWidth > 765) {
      const batchLength = Math.ceil(batchInformation.length / 3);
      if (count.current === 0) {
        count.current = batchLength;
      }
      count.current--;
      sliderList.current.style.transform = `translate(-${
        1380 * count.current
      }px, 0)`;
    } else {
      const batchLength = batchInformation.length;
      if (count.current === 0) {
        count.current = batchLength;
      }
      count.current--;
      sliderList.current.style.transform = `translate(-${
        310 * count.current
      }px, 0)`;
    }
  };

  const goToNext = () => {
    if (window.outerWidth > 765) {
      const batchLength = Math.ceil(batchInformation.length / 3);
      const batchEvenLength = batchLength % 2 === 0;

      if (batchEvenLength) {
        const batchOddLength = batchLength - 1;
        if (count.current === batchOddLength) {
          count.current = -1;
        }
      } else if (!batchEvenLength) {
        if (count.current === batchLength - 1) count.current = -1;
      }

      count.current++;
      sliderList.current.style.transform = `translate(-${
        1380 * count.current
      }px, 0)`;
    } else {
      const batchLength = batchInformation.length;
      const batchEvenLength = batchLength % 2 === 0;

      if (batchEvenLength) {
        const batchOddLength = batchLength - 1;
        if (count.current === batchOddLength) {
          count.current = -1;
        }
      } else if (!batchEvenLength) {
        if (count.current === batchLength - 1) count.current = -1;
      }

      count.current++;
      sliderList.current.style.transform = `translate(-${
        310 * count.current
      }px, 0)`;
    }
  };
  // 슬라이더 로직 - 끝 (리팩토링 예정)

  const calculateDday = value => (value > 0 ? `+ ${value}` : `- ${value * -1}`);

  const handleModalAfterBatchDelete = () => setDeleteBatchInformation(false);
  const handleModalAfterBatchEdit = () => setEditBatchInformation(false);

  return (
    <FadeIn>
      <ContentsContainer>
        <MoveBtnContainer>
          <LeftBtn onClick={goToPrevious}>
            <i className="fas fa-arrow-left"></i>
          </LeftBtn>
          <RightBtn onClick={goToNext}>
            <i className="fas fa-arrow-right"></i>
          </RightBtn>
        </MoveBtnContainer>
        <Title>진행중인 기수 현황</Title>
        <BatchInformationContainer ref={sliderList}>
          {batchInformation.map((batch, index) => {
            const {
              batch_id,
              batch_name,
              batch_start_day,
              batch_end_day,
              batch_total_time,
              wecode_d_day,
              batch_on_user_number,
              batch_total_user_number,
              mentor_name,
            } = batch;
            return (
              <List key={index}>
                <Contents
                  images={getRandomImage(IMAGES)}
                  onClick={() => {
                    goToBatchPage(batch_id);
                  }}
                >
                  <BatchName>{batch_id}기</BatchName>
                  <MentorContainer>
                    <MentorText>💁🏻‍♂️ 담임멘토</MentorText>
                    <MentorName>{mentor_name}</MentorName>
                  </MentorContainer>
                  <DayContainer>
                    <AfterDday>D {calculateDday(wecode_d_day)}</AfterDday>
                    <StartEndContainer>
                      <StartEnd>시작일</StartEnd>
                      <StartDay>{batch_start_day}</StartDay>
                    </StartEndContainer>
                    <StartEndContainer>
                      <StartEnd>종료일</StartEnd>
                      <EndDay>{batch_end_day}</EndDay>
                    </StartEndContainer>
                    <TotalTimeContainer>
                      <TotalTimeText>누적</TotalTimeText>
                      <TotalTime>
                        {convertSecondsToHours(batch_total_time)} 시간
                      </TotalTime>
                    </TotalTimeContainer>
                    <BatchOnUser>
                      <UserStatus>현재 출석 현황</UserStatus>
                      <OnUser count={batch_on_user_number}>
                        {batch_on_user_number}
                      </OnUser>
                      <Slash>/</Slash>
                      <TotalUser>{batch_total_user_number}</TotalUser>
                    </BatchOnUser>
                  </DayContainer>
                </Contents>
                <EditAndCloseBtn>
                  <EditBtn
                    onClick={() => {
                      setEditBatchInformation(true);
                      setPrevBatchInformation(batch);
                    }}
                  >
                    <i className="fas fa-cog"></i>
                  </EditBtn>
                  <CloseBtn
                    onClick={() => {
                      setDeleteBatchInformation(true);
                      setDeleteBatchNumber(batch_id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </CloseBtn>
                </EditAndCloseBtn>
              </List>
            );
          })}
          {deleteBatchInformation && (
            <Modal setOff={setDeleteBatchInformation}>
              <DeleteBatchInfoForm
                deleteBatchNumber={deleteBatchNumber}
                isModalOff={handleModalAfterBatchDelete}
              />
            </Modal>
          )}
          {editBatchInformation && (
            <Modal setOff={setEditBatchInformation}>
              <EditBatchInfoFrom
                prevBatchInformation={prevBatchInformation}
                isModalOff={handleModalAfterBatchEdit}
              />
            </Modal>
          )}
        </BatchInformationContainer>
      </ContentsContainer>
    </FadeIn>
  );
}

const convertSecondsToHours = seconds => {
  return Math.round(seconds / 360) / 10;
};

const ContentsContainer = styled.section`
  ${({ theme }) => theme.flexbox('column')}
  margin: 80px auto 0;
  position: relative;
  padding: 60px 0;
  max-width: 1440px;
  overflow: hidden;

  ${({ theme }) => theme.tablet`
  ${({ theme }) => theme.flexbox('column', 'start')}
  position: relative;
  width: 100%;
  top: -159px;

  `}
`;

const MoveBtnContainer = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  width: 500px;
  top: 65px;
  position: absolute;

  ${({ theme }) => theme.tablet`
    margin-top: 145px;
    width: 250px;
  `}
`;

const LeftBtn = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  cursor: pointer;
  transition: 0.3s transform;

  ${({ theme }) => theme.tablet`
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  `}

  &:active {
    opacity: 0.5;
  }

  &:hover {
    transform: scale(1.3);
  }
`;

const RightBtn = LeftBtn.withComponent('button');

const Title = styled.h1`
  margin-bottom: 50px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.pixelToRem(35)};
  text-align: center;

  ${({ theme }) => theme.tablet`
    margin-top: 150px;
    font-size: ${({ theme }) => theme.pixelToRem(20)};
  `}
`;

const BatchInformationContainer = styled.ul`
  ${({ theme }) => theme.flexbox('row', 'start')}
  width: 1380px;
  transition: transform 0.5s;

  ${({ theme }) => theme.tablet`
    margin-left: 1072px;
  `}
`;

const List = styled.li`
  margin: 0 30px;
`;

const Contents = styled.dl`
  ${({ theme }) => theme.flexbox('column', 'center', 'start')}
  margin-bottom: 20px;
  padding: 20px;
  position: relative;
  width: 400px;
  height: 550px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  text-align: left;
  transition: 0.3s transform, 0.3s box-shadow, 0.2s opacity;

  ${({ theme }) => theme.tablet`
  ${({ theme }) => theme.flexbox('column')}
    margin-bottom: 10px;
    width: 250px;
    height: 50vh;
  `}

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

  ${({ theme }) => theme.tablet`
  left: 5px;
  bottom: -20px;
  `}
`;

const MentorContainer = styled.div`
  ${({ theme }) => theme.flexbox()}
`;

const MentorText = styled.dd`
  position: relative;
  left: 180px;
  bottom: 70px;
  font-size: ${({ theme }) => theme.pixelToRem(18)};
  font-weight: 700;
`;
const MentorName = styled.dd`
  position: relative;
  left: 205px;
  bottom: 60px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};

  ${({ theme }) => theme.tablet`
  display: none;
  left 0;
  bottom: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  `}
`;

const AfterDday = styled.dd`
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(45)};
  font-weight: 700;
`;

const StartEndContainer = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  margin-bottom:10px;
`;

const StartEnd = styled.p`
  margin-right: 10px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
`;

const StartDay = styled.dd`
  font-size: ${({ theme }) => theme.pixelToRem(17.5)};
`;

const EndDay = styled(StartDay.withComponent('dd'))``;

const TotalTimeContainer = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'flex-end')}
  margin: 40px 0 20px 0;
`;

const TotalTimeText = styled.p`
  font-size: ${({ theme }) => theme.pixelToRem(16)};
  font-weight: 700;
  margin-right: 10px;
`;

const TotalTime = styled.dd`
  margin-bottom: 30px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const BatchOnUser = styled.dd`
  ${({ theme }) => theme.flexbox()}
  font-size: ${({ theme }) => theme.pixelToRem(25)};

  ${({ theme }) => theme.tablet`
    margin: 0 0 20px 10px;
    position: relative;
    bottom: 20px;
  `}
`;

const UserStatus = styled.div`
  font-weight: 700;
  margin-right: 15px;

  ${({ theme }) => theme.tablet`
    display: none;
  `}
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

const EditAndCloseBtn = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-end')}
  position: relative;
  left: 25px;
`;

const EditBtn = styled.button`
  margin-right: 15px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  transition: 0.3s color, 0.3s transform;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }

  ${({ theme }) => theme.tablet`
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  `}
`;

const CloseBtn = styled(EditBtn.withComponent('button'))`
  transition: 0.3s color, 0.3s transform;
  margin-right: 25px;
  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;
