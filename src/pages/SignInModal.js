import React from 'react';
import styled from 'styled-components';

const SignInModal = () => {
  return (
    <ModalContainer>
      <MainLogo>&gt;we-record</MainLogo>
      <SignInContainer>
        <SignInHeader>추가 정보를 입력해주세요 ✏️ </SignInHeader>
        <SignInContent>
          <SignInForm>
            <SignInTitle>사용자</SignInTitle>
            <div>
              <label>
                <SignInInput type="radio" id="student" checked /> 학생
              </label>
              <SignInInput type="radio" id="mento" /> 멘토
            </div>
          </SignInForm>
          <SignInForm>
            <SignInTitle>이름</SignInTitle>
            <SignInInput placeholder="이름을 입력해주세요." />
          </SignInForm>
          <SignInForm>
            <SignInTitle>기수</SignInTitle>
            <SignInInput
              type="number"
              placeholder="숫자로만 입력해주세요. ex)21"
            />
          </SignInForm>
          <SignInForm>
            <SignInTitle>시작일</SignInTitle>
            <SignInInput placeholder="ex)2020.03.02" />
          </SignInForm>
          <SignInForm>
            <SignInTitle>종료일</SignInTitle>
            <SignInInput placeholder="ex)2020.05.05" />
          </SignInForm>
          <SignInForm>
            <SignInTitle>포지션</SignInTitle>
            <PositionSelect>
              <option value="Front">FrontEnd</option>
              <option value="Back">BackEnd</option>
              <option value="Fullstack">Fullstack</option>
              <option selected value="Undefined">
                미정
              </option>
            </PositionSelect>
          </SignInForm>
          <SignInForm>
            <SignInTitle>생일</SignInTitle>
            <SignInInput placeholder="이름을 입력해주세요" />
          </SignInForm>
          <SignInForm>
            <SignInTitle>Blog</SignInTitle>
            <SignInInput placeholder="이름을 입력해주세요" />
          </SignInForm>
          <SignInForm>
            <SignInTitle>GitHub</SignInTitle>
            <SignInInput placeholder="이름을 입력해주세요" />
          </SignInForm>
        </SignInContent>
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
`;

const SignInHeader = styled.h1`
  text-align: left;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 20px;
`;

const SignInContent = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
`;

const SignInForm = styled.li`
  ${({ theme }) => theme.flexbox('column', 'start', 'stretch')};
  margin-bottom: 20px;
  div {
    ${({ theme }) => theme.flexbox('row', 'start', 'stretch')};
    text-align: left;
  }
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

const PositionSelect = styled.select`
  padding: 3px;
  outline: none;
  border: 1px solid;
  border-radius: 2px;
`;
