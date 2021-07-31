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
              goToMainPage('main');
            }}
            isCheckMentor={isCheckMentor}
          >
            We record
          </StyledLogo>
          <StyledBtnContainer handleMobileBtnList={mobileNavBtnDisplayOn}>
            {!isCheckMentor && location.pathname !== '/mypage' && (
              <Button
                onClick={() => {
                  goToPage('mypage');
                }}
                borderColor={location.pathname}
              >
                마이 페이지
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
            {!isCheckMentor && !location.pathname.includes('/batch/') && (
              <Button
                onClick={() => {
                  goToPage(`batch/${batch}`);
                }}
                borderColor={location.pathname}
              >
                기수 페이지
              </Button>
            )}
            <Button onClick={handleLogout}>로그아웃</Button>
          </StyledBtnContainer>
          <StyledMobileBtnList onClick={handleMobileBtnlist}>
            <i className="fas fa-bars"></i>
          </StyledMobileBtnList>
        </Container>
      )}
    </>
  );
}

const logoAnimation = keyframes`
  from {
    width: 0px;    
  }
  to{
    width: 68px;
    background-color: ${({ theme }) => theme.colors.fontColor}
  }
`;

const showContainerAnimation = keyframes`
  from {
    opacity: 0
  }
  to{
    opacity: 1
  }
`;

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  padding: 54px 200px;
  height: 60px;
  width: 100%;
  top: 0;
  position: fixed;
  background-color: transparent;
  animation-name: ${showContainerAnimation};
  animation-duration: 1s;
  z-index: 100;
`;

const Button = styled.button`
  margin-right: 30px;
  padding: 6px;
  color: ${({ theme }) => theme.colors.buttonAndLogo};
  font-size: ${({ theme }) => theme.pixelToRem(13)};
  font-weight: 700;
  transition: color 0.3s;
  border-radius: 20px;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }

  &:active {
    opacity: 0.5;
  }
`;

const StyledLogo = styled(Button.withComponent('button'))`
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
`;

const StyledMobileLogo = styled.div`
  display: none;
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;
  cursor: ${({ isCheckMentor }) => !isCheckMentor && 'pointer'};

  ${({ theme }) => theme.mobile`
    display: block;
  `}

  &:before {
    display: block;
    position: absolute;
    width: 68px;
    height: 30px;
    top: 3px;
    content: '';
    opacity: 0.5;
    background-color: #dedede;
    animation-name: ${logoAnimation};
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.14, 1.04, 1, 0.98);
  }

  &:hover {
    ${({ isCheckMentor }) => !isCheckMentor && 'opacity: 0.7'}
  }

  &:active {
    ${({ isCheckMentor }) => !isCheckMentor && 'opacity: 0.5'}
  }
`;

const StyledBtnContainer = styled.div`
  button:last-child {
    margin-right: 0;
  }

  ${({ theme }) => theme.mobile`
   display: none;
   transform: scale(0.8);
   background-color: ${({ theme }) => theme.colors.white};
   border-radius: 5px;
   padding: 20px;

   &:after {
    display: block;
    position: absolute;
    left: 4px;
    width: 15px;
    height: 15px;
    top: -6px;
    left: 122px;
    content: '';
    background-color: ${({ theme }) => theme.colors.white};
    transform: rotate(45deg);
  }
   
   ${({ handleMobileBtnList }) =>
     handleMobileBtnList &&
     'display: flex;  flex-direction: column; position: absolute; right: -10px; top: 38px;'}
  `}
`;

const StyledGoToMyPageBtn = styled.button`
  margin-right: 24px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.backgroundColor};
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    opacity: 0.8;
  }

  transition: transform 0.3s, background-color 0.3s, opacity 0.15s;

  ${({ theme }) => theme.mobile`
    margin-bottom: 13px;    
    margin-right: 0;
    font-size: ${({ theme }) => theme.pixelToRem(17)};

    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.black};


    &:hover {
      color: ${({ theme }) => theme.colors.white};
      border: 1px solid ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.backgroundColor};
  }

    &:active {
      opacity: 0.8;
  }
  `}
`;

const StyledMobileBtnList = styled.button`
  display: none;
  position: relative;
  top: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  cursor: pointer;

  ${({ theme }) => theme.mobile`
    display: block;
  `}
`;
