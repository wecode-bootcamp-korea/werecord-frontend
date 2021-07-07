import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Modal from '../components/Modal/Modal';
import MakeBatchForm from '../pages/MentorPage/MakeBatchForm';
import EditMentorInfoForm from '../pages/MentorPage/EditMentorInfoForm';

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
          <Logo>&gt; we-record</Logo>
          <MobileLogo>&gt; we</MobileLogo>
          <BtnContainer handleMobileBtnList={mobileNavBtnDisplayOn}>
            {!isCheckMentor && location.pathname !== '/main' && (
              <GoToMainPageBtn onClick={() => goToPage('main')}>
                메인 페이지
              </GoToMainPageBtn>
            )}

            {!isCheckMentor && location.pathname !== '/mypage' && (
              <GoToMyPageBtn
                onClick={() => {
                  goToPage('mypage');
                }}
              >
                마이 페이지
              </GoToMyPageBtn>
            )}
            {isCheckMentor && location.pathname === '/mentorpage' && (
              <EditMentorInfo
                onClick={() => {
                  setMakeBatchModalOn(false);
                  setEditMentorInfoModalOn(true);
                }}
              >
                내정보 수정
              </EditMentorInfo>
            )}
            {editMentorInfoModalOn && (
              <Modal setOff={setEditMentorInfoModalOn}>
                <EditMentorInfoForm
                  isModalOff={handleModalAfterEditMentorInfo}
                />
              </Modal>
            )}
            {isCheckMentor && location.pathname === '/mentorpage' && (
              <MakeBatchBtn
                onClick={() => {
                  setMakeBatchModalOn(true);
                  setEditMentorInfoModalOn(false);
                }}
              >
                기수 생성
              </MakeBatchBtn>
            )}
            {makeBatchModalOn && (
              <Modal setOff={setMakeBatchModalOn}>
                <MakeBatchForm isModalOff={handleModalAfterBatchMaking} />
              </Modal>
            )}
            {isCheckMentor && location.pathname !== '/mentorpage' && (
              <GoToMentorPageBtn
                onClick={() => {
                  goToPage('mentorpage');
                }}
              >
                멘토 페이지
              </GoToMentorPageBtn>
            )}
            {!isCheckMentor && !location.pathname.includes('/batch/') && (
              <GoToBatchPageBtn
                onClick={() => {
                  goToPage(`batch/${batch}`);
                }}
              >
                기수 페이지
              </GoToBatchPageBtn>
            )}
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </BtnContainer>
          <MobileBtnList onClick={handleMobileBtnlist}>
            <i className="fas fa-bars"></i>
          </MobileBtnList>
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
  padding: 12px 24px;
  height: 60px;
  width: 100%;
  top: 0;
  position: fixed;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  animation-name: ${showContainerAnimation};
  animation-duration: 1s;
  z-index: 100;
`;

const Logo = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;
  cursor: default;

  ${({ theme }) => theme.mobile`
    display: none;
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
`;

const MobileLogo = styled.div`
  display: none;
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;
  cursor: default;

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
`;

const BtnContainer = styled.div`
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
   
   ${({ handleMobileBtnList, theme }) =>
     handleMobileBtnList &&
     'display: flex;  flex-direction: column; position: absolute; right: -10px; top: 38px;'}
  `}
`;

const GoToMyPageBtn = styled.button`
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

const EditMentorInfo = GoToMyPageBtn.withComponent('button');

const MakeBatchBtn = GoToMyPageBtn.withComponent('button');

const GoToMainPageBtn = GoToMyPageBtn.withComponent('button');

const GoToBatchPageBtn = GoToMyPageBtn.withComponent('button');

const GoToMentorPageBtn = GoToMyPageBtn.withComponent('button');

const LogoutBtn = styled(GoToMyPageBtn.withComponent('button'))`
  margin-right: 0;
  padding: 10px 20px;
`;

const MobileBtnList = styled.button`
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
