import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import API_URLS from '../../../config';

const SignInModal = props => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    user_type: '',
    name: '',
    batch: '',
    position: 'Front-end',
    blog: '',
    github: '',
    birthday: '',
    email: sessionStorage.getItem('email'),
    profile_image_url: sessionStorage.getItem('profile_image_url'),
  });

  const submitButton = useRef();

  //입력 완료 버튼 클릭가능하게 할지
  const isAbleButton = () => {
    if (userInfo.user_type === '수강생') {
      return Boolean(userInfo.name && userInfo.batch);
    } else if (userInfo.user_type === '멘토') {
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
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <SignInContainer>
        <SignInHeader>추가 정보를 입력해주세요 👨🏻‍💻</SignInHeader>
        <SignIntext>*은 필수 입력 값입니다. </SignIntext>
        <SignInContent>
          <SignInForm>
            <SignInTitle>사용자 *</SignInTitle>
            <div>
              <SignInRadioInput
                onChange={getInputValue}
                type="radio"
                name="user_type"
                value="수강생"
              />
              <p>학생</p>
              <SignInRadioInput
                onChange={getInputValue}
                type="radio"
                name="user_type"
                value="멘토"
              />
              <p>멘토</p>
            </div>
          </SignInForm>
          <SignInForm>
            <SignInTitle>이름 *</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="name"
              placeholder="이름을 입력해주세요."
            />
          </SignInForm>
          {userInfo.user_type === '수강생' && (
            <SignInForm>
              <SignInTitle check={userInfo.user_type === '멘토'}>
                기수 *
              </SignInTitle>
              <SignInInput
                className="batch"
                check={userInfo.user_type === '멘토'}
                disabled={isAbleInput()}
                onChange={getInputValue}
                name="batch"
                type="number"
                placeholder="숫자로만 입력해주세요. ex)21"
              />
            </SignInForm>
          )}

          <SignInForm>
            <SignInTitle>포지션 *</SignInTitle>
            <PositionSelect name="position" onChange={getInputValue}>
              <option value="Front-end">Front-End</option>
              <option value="Back-end">Back-End</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Undefined">미정</option>
            </PositionSelect>
          </SignInForm>
          <SignInForm>
            <SignInTitle>생일</SignInTitle>
            <SignInInput
              type="date"
              onChange={getInputValue}
              name="birthday"
              max="2100-01-01"
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>Blog</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="blog"
              placeholder="블로그 주소를 입력해주세요.(선택)"
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>GitHub</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="github"
              placeholder="GitHub 주소를 입력해주세요.(선택)"
            />
          </SignInForm>
        </SignInContent>
        <Button
          fontSize="12"
          type="white"
          disabled={!isAbleButton()}
          clickEvent={postUserData}
          useRef={submitButton}
        >
          입력 완료
        </Button>
      </SignInContainer>
    </ModalContainer>
  );
};
export default SignInModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  width: 100%;
  height: 100%;
  padding: 60px 50px;
`;

const MainLogo = styled.div`
  padding: 30px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 25px;
  font-weight: 700;
`;

const SignInContainer = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
  margin-top: 20px;
`;

const SignIntext = styled.div`
  margin: 10px 0px 20px 0px;
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-weight: 700;
  text-align: left;
`;

const SignInHeader = styled.h1`
  margin-bottom: 10px;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 20px;
`;

const SignInContent = styled.form`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
`;

const SignInForm = styled.li`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  margin-bottom: 20px;

  div {
    ${({ theme }) => theme.flexbox('row', 'start', 'stretch')};
    text-align: left;

    p {
      margin-right: 20px;
      color: black;
    }
  }
`;

const SignInTitle = styled.span`
  color: ${props =>
    props.check ? `${({ theme }) => theme.colors.gray}` : 'black'};
  margin-right: 7px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 17px;
  text-align: left;
`;

const SignInInput = styled.input`
  width: 90%;
  font-size: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
`;

const SignInRadioInput = styled.input`
  margin-right: 5px;
`;

const PositionSelect = styled.select`
  padding: 3px;
  border: 1px solid;
  border-radius: 2px;
  outline: none;
`;
