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
    const batchLength = Math.ceil(batchInformation.length / 3);
    if (count.current === 0) {
      count.current = batchLength;
    }
    count.current--;
    sliderList.current.style.transform = `translate(-${
      1380 * count.current
    }px, 0)`;
  };

  const goToNext = () => {
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
  };
  // 슬라이더 로직 - 끝 (리팩토링 예정)

  const calculateDday = value => (value > 0 ? `+${value}` : `${value}`);

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
                  <MentorName>담임: {mentor_name}</MentorName>
                  <AfterDday>D {calculateDday(wecode_d_day)}</AfterDday>
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
            <Modal setOff={setDeleteBatchInformation} height="200px">
              <DeleteBatchInfoForm
                deleteBatchNumber={deleteBatchNumber}
                isModalOff={handleModalAfterBatchDelete}
              />
            </Modal>
          )}
          {editBatchInformation && (
            <Modal setOff={setEditBatchInformation} height="450px">
              <EditBatchInfoFrom
                prevBatchInformation={prevBatchInformation}
                isModalOff={handleModalAfterBatchEdit}
              />
            </Modal>
          )}
          {}
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
`;

const MoveBtnContainer = styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  width: 500px;
  top: 65px;
  position: absolute;
`;
const LeftBtn = styled.button`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  cursor: pointer;
  transition: 0.3s transform;

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
`;

const BatchInformationContainer = styled.ul`
  ${({ theme }) => theme.flexbox('row', 'start')}
  width: 1380px;
  transition: transform 0.5s;
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

const MentorName = styled.dd`
  position: relative;
  left: 205px;
  bottom: 60px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
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

const EditAndCloseBtn = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-end')}
  position: relative;
  left: 25px;
`;

const EditBtn = styled.button`
  margin-right: 30px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  transition: 0.3s color, 0.3s transform;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }

  &:active {
    opacity: 0.8;
  }
`;

const CloseBtn = styled(EditBtn.withComponent('button'))`
  transition: 0.3s color, 0.3s transform;

  &:hover {
    color: ${({ theme }) => theme.colors.red};
  }
`;
