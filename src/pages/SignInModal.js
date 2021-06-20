import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const SignInModal = () => {
  const [userInfo, setUserInfo] = useState({
    user_type: '',
    name: '',
    batch: '',
    position: '',
    blog: '',
    github: '',
    birthday: '',
  });

  const nameInput = useRef();
  const batchInput = useRef();
  const submitButton = useRef();

  const [requiredUserInfo, setRequiredUserInfo] = useState(true);
  // const { user_type, name, batch, position, blog, github, birthday } = userInfo;

  //input 값을 setState하기
  const getInputValue = e => {
    const { name, value } = e.target;
    const nextInput = {
      ...userInfo,
      [name]: value,
    };
    setUserInfo(nextInput);
    if (nameInput.current.value && batchInput.current.value) {
      setRequiredUserInfo(false);
    } else {
      setRequiredUserInfo(true);
    }
  };

  //input 값 초기화
  // const resetInputValue = () => {
  //   const resetInputs = {
  //     user_type: '',
  //     name: '',
  //     batch: '',
  //     position: '',
  //     blog: '',
  //     github: '',
  //     birthday: '',
  //   };
  //   setUserInfo(resetInputs);
  // };

  const postUserData = e => {
    e.preventDefault();
    const userData = JSON.stringify(userInfo);
    const userInformation = new FormData();
    userInformation.append('info', userData);
    const wrtoken = sessionStorage.getItem('wrtoken');

    fetch(`http://192.168.43.197:8000/users/info/${sessionStorage.user_id}`, {
      method: 'post',
      // header: {
      //   Authorization: wrtoken,
      // },
      // body: JSON.stringify({ user_info: userInfo }),
      body: userInformation,
    })
      .then(res => res.json())
      .then(res => console.log(res));
    // resetInputValue();
    console.log(userInfo);
  };

  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <SignInContainer>
        <SignInHeader>추가 정보를 입력해주세요 ✏️ </SignInHeader>
        <SignInContent>
          <SignInForm>
            <SignInTitle>사용자</SignInTitle>
            <div>
              <SignInRadioInput
                onChange={getInputValue}
                type="radio"
                name="user_type"
                value="수강생"
                checked
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
            <SignInTitle>이름</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="name"
              placeholder="이름을 입력해주세요."
              ref={nameInput}
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>기수</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="batch"
              type="number"
              placeholder="숫자로만 입력해주세요. ex)21"
              ref={batchInput}
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>포지션</SignInTitle>
            <PositionSelect>
              <option value="Front">Front-End</option>
              <option value="Back">Back-End</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Undefined">미정</option>
            </PositionSelect>
          </SignInForm>
          <SignInForm>
            <SignInTitle>생일</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="birthday"
              placeholder="생일을 입력해주세요"
            />
            <SignInValidation>* 입력형식에 맞춰주세요</SignInValidation>
          </SignInForm>
          <SignInForm>
            <SignInTitle>Blog</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="blog"
              placeholder="블로그 URL을 입력해주세요"
            />
            <SignInValidation>* 입력형식에 맞춰주세요</SignInValidation>
          </SignInForm>
          <SignInForm>
            <SignInTitle>GitHub</SignInTitle>
            <SignInInput
              onChange={getInputValue}
              name="github"
              placeholder="GitHub 을 입력해주세요"
            />
            <SignInValidation>* 입력형식에 맞춰주세요</SignInValidation>
          </SignInForm>
        </SignInContent>
        <SubmitButton
          useRef={submitButton}
          onClick={postUserData}
          disabled={requiredUserInfo}
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

const SignInHeader = styled.h1`
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
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
  color: ${({ theme }) => theme.colors.black};
  font-size: 17px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: 700;
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
