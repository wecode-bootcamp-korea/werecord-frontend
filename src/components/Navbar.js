import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Modal from '../components/Modal/Modal';
import MakeBatchForm from '../pages/MentorPage/MakeBatchForm';
import EditMentorInfoForm from '../pages/MentorPage/EditMentorInfoForm';

import styled, { keyframes } from 'styled-components';

export default function Navbar() {
  const [makeBatchModalOn, setMakeBatchModalOn] = useState(false);
  const [editMentorInfoModalOn, setEditMentorInfoModalOn] = useState(false);
  const [mobileNavBtnDisplayOn, setMobileNavBtnDisplayOn] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const isCheckMentor = sessionStorage.getItem('user_type') === '멘토';

  const goToPage = (page = '') => {
    history.push(`/${page}`);
    setMobileNavBtnDisplayOn(false);
  };

  const goToMainPage = () => !isCheckMentor && goToPage('main');

  const batch = sessionStorage.getItem('batch');

  const handleLogout = () => {
    if (sessionStorage.getItem('wrtoken')) {
      sessionStorage.clear();
      goToPage();
    }
  };

  const handleMobileBtnlist = () => {
    !mobileNavBtnDisplayOn
      ? setMobileNavBtnDisplayOn(true)
      : setMobileNavBtnDisplayOn(false);
  };

  const handleModalAfterBatchMaking = () => setMakeBatchModalOn(false);
  const handleModalAfterEditMentorInfo = () => setEditMentorInfoModalOn(false);

  return (
    <>
      {location.pathname !== '/' && (
        <Container>
          <StyledLogo
            onClick={() => {
              goToMainPage('/main');
            }}
            isCheckMentor={isCheckMentor}
            isMain={location.pathname}
          >
            We Record
          </StyledLogo>
          <StyledBtnContainer handleMobileBtnList={mobileNavBtnDisplayOn}>
            {!isCheckMentor && (
              <Button
                onClick={() => {
                  goToPage('mypage');
                }}
                isPage={location.pathname === '/mypage'}
              >
                마이 페이지
              </Button>
            )}
            {!isCheckMentor && (
              <Button
                onClick={() => {
                  goToPage(`batch/${batch}`);
                }}
                isPage={location.pathname.indexOf('batch') > 0}
              >
                기수 페이지
              </Button>
            )}

            {isCheckMentor && location.pathname === '/mentorpage' && (
              <Button
                onClick={() => {
                  setMakeBatchModalOn(false);
                  setEditMentorInfoModalOn(true);
                }}
              >
                내정보 수정
              </Button>
            )}
            {editMentorInfoModalOn && (
              <Modal setOff={setEditMentorInfoModalOn}>
                <EditMentorInfoForm
                  isModalOff={handleModalAfterEditMentorInfo}
                />
              </Modal>
            )}
            {isCheckMentor && location.pathname === '/mentorpage' && (
              <Button
                onClick={() => {
                  setMakeBatchModalOn(true);
                  setEditMentorInfoModalOn(false);
                }}
                borderColor={location.pathname}
              >
                기수 생성
              </Button>
            )}
            {makeBatchModalOn && (
              <Modal setOff={setMakeBatchModalOn}>
                <MakeBatchForm isModalOff={handleModalAfterBatchMaking} />
              </Modal>
            )}
            {isCheckMentor && location.pathname !== '/mentorpage' && (
              <Button
                onClick={() => {
                  goToPage('mentorpage');
                }}
                borderColor={location.pathname}
              >
                멘토 페이지
              </Button>
            )}
            <Button onClick={handleLogout}>로그아웃</Button>
          </StyledBtnContainer>
          <StyledMobileBtnList onClick={handleMobileBtnlist}>
            <i className="fas fa-bars" />
          </StyledMobileBtnList>
        </Container>
      )}
    </>
  );
}

const showContainerAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')};
  position: relative;
  max-width: 1440px;
  margin: 60px auto;
  padding: 0 200px;
  animation-name: ${showContainerAnimation};
  animation-duration: 1s;
  z-index: 100;

  ${({ theme }) => theme.tablet`
    padding: 0 50px;
  `}
`;

const Button = styled.button`
  margin-right: 30px;
  padding: 7px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.fontColorPurple};
  font-size: ${({ theme }) => theme.pixelToRem(13)};
  font-weight: 700;
  font-family: Noto Sans KR;
  transition: all 0.3s ease;
  border-radius: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.fontColorWhite};
    border-radius: 20px;
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.colors.fontColorWhite};
    border: 1px solid ${({ theme }) => theme.colors.white};
  }

  ${({ isPage }) => isPage && `color: #ffffff`};

  ${({ theme }) => theme.tablet`
    margin-right: 0;
    color: ${({ theme }) => theme.colors.fontColorPurple};
  `}
`;

const StyledLogo = styled(Button.withComponent('button'))`
  border: none;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  color: ${({ isMain }) => isMain === '/main' && 'white'};

  &:hover {
    border: none;
  }
`;

const StyledBtnContainer = styled.div`
  button:last-child {
    margin-right: 0;
  }

  ${({ theme }) => theme.tablet`
    display: none;
    transform: scale(0.8);
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    padding: 20px;

    &:after {
      width: 15px;
      height: 15px;
      top: -6px;
      content: '';
      ${({ theme }) => theme.posCenterX('absolute')};
      background-color: ${({ theme }) => theme.colors.white};
      transform: rotate(45deg);
    }

    & > button:hover {
      color: ${({ theme }) => theme.colors.fontColorPurple};
    }
  
    ${({ handleMobileBtnList }) =>
      handleMobileBtnList &&
      'display: flex;  flex-direction: column; position: absolute; right: 5px; top: 38px; z-index: 200'}
    `}
`;

const StyledMobileBtnList = styled.div`
  display: none;
  top: 5px;
  color: ${({ theme }) => theme.colors.fontColorPurple};
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  cursor: pointer;

  ${({ theme }) => theme.tablet`
    display: block;
  `}
`;
