import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const SignInModal = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    user_type: '',
    name: '',
    batch: '',
    position: 'Undefined',
    blog: '',
    github: '',
    birthday: '',
  });
  const nameInput = useRef();
  const batchInput = useRef();
  const submitButton = useRef();

  //입력 완료 버튼 클릭가능하게 할지
  const isAbleButton = () => {
    if (userInfo.user_type === '수강생') {
      return Boolean(nameInput.current.value && batchInput.current.value);
    } else if (userInfo.user_type === '멘토') {
      return Boolean(nameInput.current.value);
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

    fetch(`http://10.58.2.86:8000/users/info/${sessionStorage.user_id}`, {
      method: 'post',
      // 토큰을 보낼지 말지 대환님이 경훈님과 상의해보기로 함
      // header: {
      //   Authorization: wrtoken,
      // },
      body: userInformation,
    })
      // respond확인용
      .then(res => res.json())
      .then(res => console.log(res));
    // 사용자 타입에 따른 이동
    // if (res.message === 'SUCCESS') {
    if (userInfo.user_type === '수강생') {
      history.push('/main');
    } else if (userInfo.user_type === '멘토') {
      history.push('/googleLogin');
    }
    // }
  };

  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <SignInContainer>
        <SignInHeader>추가 정보를 입력해주세요 ✏️ </SignInHeader>
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
              ref={nameInput}
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle check={userInfo.user_type === '멘토'}>
              기수 *
            </SignInTitle>
            <SignInInput
              disabled={isAbleInput()}
              onChange={getInputValue}
              name="batch"
              type="number"
              placeholder="숫자로만 입력해주세요. ex)21"
              ref={batchInput}
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>포지션 *</SignInTitle>
            <PositionSelect name="position" onChange={getInputValue}>
              <option value="Front-End">Front-End</option>
              <option value="Back-End">Back-End</option>
              <option value="Fullstack">Fullstack</option>
              <option selected value="Undefined">
                미정
              </option>
            </PositionSelect>
          </SignInForm>
          <SignInForm>
            <SignInTitle>생일</SignInTitle>
            <SignInInput
              type="date"
              onChange={getInputValue}
              name="birthday"
              placeholder="생일을 입력해주세요"
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>Blog</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="blog"
              placeholder="블로그 URL을 입력해주세요"
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>GitHub</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="github"
              placeholder="GitHub 을 입력해주세요"
            />
          </SignInForm>
        </SignInContent>
        <SubmitButton
          useRef={submitButton}
          onClick={postUserData}
          disabled={!isAbleButton()}
        >
          입력 완료
        </SubmitButton>
      </SignInContainer>
    </ModalContainer>
  );
};
export default SignInModal;

const ModalContainer = styled.section`
  ${({ theme }) => theme.flexbox()};
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const MainLogo = styled.div`
  font-size: 25px;
  padding: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;
const SignInContainer = styled.section`
  ${({ theme }) => theme.flexbox('column', 'center', 'stretch')};
  margin-top: 20px;
`;

const SignIntext = styled.div`
  color: ${({ theme }) => theme.colors.black};
  margin: 10px 0px 20px 0px;

  font-size: 12px;
`;

const SignInHeader = styled.h1`
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 10px;
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
      color: black;
      margin-right: 20px;
    }
  }
`;
const SignInValidation = styled.p`
  color: red;
  font-size: 10px;
  text-align: left;
  margin-top: 5px;
`;

const SignInTitle = styled.span`
  /* color: ${({ theme }) => theme.colors.black}; */
  color: ${props => (props.check ? 'gray' : 'black')};
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: 700;
  margin-right: 7px;
`;

const SignInInput = styled.input`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  font-size: 15px;
  width: 90%;
`;

const SignInRadioInput = styled.input`
  margin-right: 5px;
`;

const PositionSelect = styled.select`
  padding: 3px;
  outline: none;
  border: 1px solid;
  border-radius: 2px;
`;

const SubmitButton = styled.button`
  font-size: 15px;
  font-weight: 700;
  width: 90px;
  height: 25px;
  position: relative;
  top: 5px;
  left: 150px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }
`;
