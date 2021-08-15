import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import GoogleLogin from './GoogleLogin';
import API_URLS from '../../config';

export default function Rending() {
  const [userInfo, setUserInfo] = useState({
    user_type: '',
    name: '',
    batch: '',
    position: '',
    blog: '',
    github: '',
    birthday: '',
    email: sessionStorage.getItem('email'),
    profile_image_url: sessionStorage.getItem('profile_image_url'),
  });
  const [studentRadioButton, setStudentRadioButton] = useState(false);
  const [mentorRadioButton, setMentorRadioButton] = useState(false);
  const submitButton = useRef();
  const history = useHistory();
  const [isSignOn, setIsSignOn] = useState(false);

  useEffect(() => {
    if (sessionStorage.user_type === '수강생') {
      setMentorRadioButton(true);
    } else if (sessionStorage.user_type === '멘토') {
      setStudentRadioButton(true);
    }
  }, []);

  //입력 완료 버튼 클릭가능하게 할지
  const isAbleButton = () => {
    if (userInfo.user_type === '수강생') {
      return Boolean(userInfo.name && userInfo.batch);
    }
    if (userInfo.user_type === '멘토') {
      return Boolean(userInfo.name);
    }
  };

  //멘토일때 입력금지
  const isAbleInput = () => {
    if (userInfo.user_type === '멘토') {
      return true;
    }
  };

  //input 값을 setState하기
  const getInputValue = e => {
    const { name, value } = e.target;
    const valuedInput = {
      ...userInfo,
      [name]: value,
    };
    setUserInfo(valuedInput);
  };

  // 추가입력정보 백엔드로 보내기
  const postUserData = e => {
    e.preventDefault();
    const userData = JSON.stringify(userInfo);
    const userInformation = new FormData();
    userInformation.append('info', userData);
    const wrtoken = sessionStorage.getItem('wrtoken');

    fetch(`${API_URLS.SIGNIN}`, {
      method: 'POST',
      headers: {
        Authorization: wrtoken,
      },
      body: userInformation,
    })
      .then(res => res.json())
      // 사용자 타입에 따른 이동
      .then(res => {
        sessionStorage.setItem('user_type', res.user_info.user_type);
        sessionStorage.setItem('batch', res.user_info.batch);
        if (res.message === 'SUCCESS') {
          if (userInfo.user_type === '수강생') {
            history.push('/main');
          } else if (userInfo.user_type === '멘토') {
            history.push('/mentorpage');
          }
        }
      });
  };

  return (
    <FadeIn transitionDuration={1000}>
      <Container>
        {!isSignOn ? (
          <LeftArea>
            <MainLogo>We Record</MainLogo>
            <FadeIn delay={600} transitionDuration={1000}>
              <SubLogo className="top">우리는</SubLogo>
              <SubLogo className="bottom">기록합니다.</SubLogo>
            </FadeIn>
            <GoogleLogin setIsSignOn={setIsSignOn} />
          </LeftArea>
        ) : (
          <LeftArea>
            <MainLogo>추가 정보를 입력해주세요</MainLogo>
            <UserTypeInput>
              <Title>사용자*</Title>
              <RadioBtnArea>
                <RadioInput
                  onChange={getInputValue}
                  type="radio"
                  id="student"
                  name="user_type"
                  value="수강생"
                  disabled={studentRadioButton}
                />
                <Label
                  className="student"
                  htmlFor="student"
                  changeColor={userInfo.user_type === '수강생'}
                >
                  학생
                </Label>
                <RadioInput
                  onChange={getInputValue}
                  type="radio"
                  id="mentor"
                  name="user_type"
                  value="멘토"
                  disabled={mentorRadioButton}
                />
                <Label
                  className="mentor"
                  htmlFor="mentor"
                  changeColor={userInfo.user_type === '멘토'}
                >
                  멘토
                </Label>
              </RadioBtnArea>
              <TextInputArea>
                <UserInfo>
                  <Title>이름*</Title>
                  <TextInput
                    hasValue={userInfo.name !== ''}
                    onChange={getInputValue}
                    name="name"
                    type="text"
                  />
                </UserInfo>
                <UserInfo>
                  <Title>기수*</Title>
                  <TextInput
                    hasValue={userInfo.batch !== ''}
                    onChange={getInputValue}
                    disabled={isAbleInput()}
                    name="batch"
                    type="number"
                  />
                </UserInfo>
              </TextInputArea>
              <PositionArea>
                <Title>포지션*</Title>
                <RadioBtnArea>
                  <RadioInput
                    onChange={getInputValue}
                    type="radio"
                    id="Front-end"
                    name="position"
                    value="Front-end"
                  />
                  <Label
                    htmlFor="Front-end"
                    changeColor={userInfo.position === 'Front-end'}
                  >
                    Front-end
                  </Label>
                  <RadioInput
                    onChange={getInputValue}
                    type="radio"
                    id="back"
                    name="position"
                    value="Back-end"
                  />
                  <Label
                    htmlFor="back"
                    changeColor={userInfo.position === 'Back-end'}
                  >
                    Back-end
                  </Label>
                </RadioBtnArea>
              </PositionArea>
            </UserTypeInput>
            <LoginBtn
              disabled={!isAbleButton()}
              onClick={postUserData}
              useRef={submitButton}
            >
              We Record 시작하기
            </LoginBtn>
          </LeftArea>
        )}
        <RightImg alt="rendingImg" src="/images/rending/rending.png" />
      </Container>
    </FadeIn>
  );
}

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'space-between')};
  max-width: 1440px;
  position: relative;
  margin: 170px auto 130px auto;
  padding: 0 180px 0 200px;
  z-index: 99;

  ${({ theme }) => theme.tablet`
    ${({ theme }) => theme.flexbox('column')};
    padding: 0 50px;
  `}
`;

const LeftArea = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};

  .top {
    margin-top: 20px;
  }

  .bottom {
    margin-top: 10px;
  }
`;

const MainLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(32)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.fontColorWhite};
`;

const SubLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(60)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorWhite};
`;

const RightImg = styled.img`
  width: 600px;
  height: 600px;

  ${({ theme }) => theme.tablet`
    position: absolute;
    width: 400px;
    height: 400px;
    opacity: 0.1;
    z-index: -1;
  `}
`;

const UserTypeInput = styled.div`
  margin-top: 42px;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  opacity: 0.6;
`;

const RadioBtnArea = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
  margin-top: 2px;
`;

const RadioInput = styled.input`
  position: relative;
  -webkit-appearance: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  outline: none;
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.purple};

    ${({ disabled }) => disabled && `border-color: #e0e0e0`};
  }

  &:before {
    content: '';
    display: block;
    width: 55%;
    height: 55%;
    border-radius: 50%;
    ${({ theme }) => theme.posCenter('absolute')};
    transition: all 0.1s ease;
  }

  &:checked:before {
    background: ${({ theme }) => theme.colors.purple};
  }

  ${({ disabled }) =>
    disabled && `background: #f8f8f8; border: 1px solid #e0e0e0;`};
`;

const Label = styled.label`
  margin-left: 10px;
  margin-right: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(22)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transition: all 0.1s ease;

  ${({ changeColor }) => changeColor && `color: #514AB8;`}
`;

const TextInputArea = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
  margin-top: 20px;
`;

const UserInfo = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};

  &:last-child {
    margin-left: 20px;
  }
`;

const TextInput = styled.input`
  width: 88px;
  height: 40px;
  padding: 4px 16px;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  font-family: Noto Sans KR;
  color: ${({ theme }) => theme.colors.fontColorPurple};
  background: white;

  ${({ disabled }) =>
    disabled && `background: #f8f8f8; border-color: #e0e0e0;`};

  ${({ hasValue }) => hasValue && `border: 1px solid #514AB8;`}

  &:hover,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.purple};

    ${({ disabled }) => disabled && `border-color: #e0e0e0;`};
  }
`;

const PositionArea = styled.div`
  margin-top: 20px;
`;

const LoginBtn = styled.div`
  margin-top: 50px;
  padding: 8px 46px;
  border: 1px solid ${({ theme }) => theme.colors.regularBtnFontColorWhite};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(24)};
  font-weight: 700;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.fontColorPurple};
    background: ${({ theme }) => theme.colors.hoverBtnBgWhite};

    ${({ disabled }) =>
      disabled &&
      `background: rgba(255, 255, 255, 0.3); border-color: rgba(255, 255, 255, 0.3); color: #ffffff`};
  }

  ${({ disabled }) =>
    disabled &&
    `background: rgba(255, 255, 255, 0.3); border-color: rgba(255, 255, 255, 0.3); cursor: not-allowed`};
`;
