import React, { useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Modal from '../components/Modal/Modal';
import MakeBatchForm from '../pages/MentorPage/MakeBatchForm';
import EditMentorInfoForm from '../pages/MentorPage/EditMentorInfoForm';

export default function Navbar() {
  const [makeBatchModalOn, setMakeBatchModalOn] = useState(false);
  const [editMentorInfoModalOn, setEditMentorInfoModalOn] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const isCheckMentor = sessionStorage.getItem('user_type') === '2';

  const goToPage = (page = '') => {
    history.push(`/${page}`);
  };

  const handleLogout = () => {
    if (sessionStorage.getItem('wrtoken')) {
      sessionStorage.clear();
      alert('로그아웃이 되었습니다.');
      goToPage();
    }
  };

  const handleModal = e => {
    const clickedInside = e.target.closest('.modal');
    const clickedBtn = e.target.closest('.closeBtn');
    if (clickedInside) {
      if (clickedBtn) {
        setMakeBatchModalOn(false);
        setEditMentorInfoModalOn(false);
      }
      if (!clickedBtn) {
        return;
      }
    } else {
      setMakeBatchModalOn(false);
      setEditMentorInfoModalOn(false);
    }
  };

  const handleModalAfterBatchMaking = () => setMakeBatchModalOn(false);
  const handleModalAfterEditMentorInfo = () => setEditMentorInfoModalOn(false);

  return (
    <>
      {location.pathname !== '/' && (
        <Container>
          <Logo>&gt; we-record</Logo>
          <div>
            {!isCheckMentor && (
              <GoToMainPageBtn onClick={() => goToPage('main')}>
                메인 페이지
              </GoToMainPageBtn>
            )}

            {!isCheckMentor && (
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
              </EditMentorInfo> // 내정보 수정
            )}
            {editMentorInfoModalOn && (
              <Modal setOff={handleModal} height="650px">
                <EditMentorInfoForm />
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
              </MakeBatchBtn> //기수 생성
            )}
            {makeBatchModalOn && (
              <Modal setOff={handleModal} height="450px">
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
            {!isCheckMentor && (
              <GoToBatchPageBtn
                onClick={() => {
                  goToPage('batch');
                }}
              >
                기수 페이지
              </GoToBatchPageBtn>
            )}
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
          </div>
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

const Container = styled.nav`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
  position: fixed;
  padding: 12px 24px;
  width: 100%;
  top: 0;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  z-index: 100;
`;

const Logo = styled.div`
  position: relative;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  font-weight: bold;

  &:before {
    display: block;
    position: absolute;
    content: '';
    width: 68px;
    height: 30px;
    top: 3px;
    opacity: 0.5;
    background-color: #dedede;
    animation-name: ${logoAnimation};
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.14, 1.04, 1, 0.98);
  }
`;

const GoToMyPageBtn = styled.button`
  margin-right: 24px;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.pixelToRem(14)};
  font-weight: bold;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    opacity: 0.8;
  }

  transition: background-color 0.3s, opacity 0.1s;
`;

const EditMentorInfo = GoToMyPageBtn.withComponent('button');

const MakeBatchBtn = GoToMyPageBtn.withComponent('button');

const GoToMainPageBtn = GoToMyPageBtn.withComponent('button');

const GoToBatchPageBtn = GoToMyPageBtn.withComponent('button');

const GoToMentorPageBtn = GoToMyPageBtn.withComponent('button');

const LogoutBtn = styled(GoToMyPageBtn.withComponent('button'))`
  margin-right: 0;
`;
