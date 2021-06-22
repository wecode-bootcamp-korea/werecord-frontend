import React, { useState } from 'react';
import styled from 'styled-components';

export default function EditContents() {
  const [userForm, setUserForm] = useState({
    name: '',
    image: '',
    position: '',
    blog: '',
    github: '',
    beginDate: '',
    endDate: '',
    birthDay: '',
  });

  const handleInput = e => {
    const { name, value } = e.target;
    const nextUserForm = { ...userForm, [name]: value };
    setUserForm(nextUserForm);
  };

  return (
    <Container>
      <Content>
        <Title>마이 페이지 정보수정 📝</Title>
        <Label>이름</Label>
        <Input
          name="name"
          placeholder="이름을 입력해주세요"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>사진</Label>
        <Input
          name="image"
          type="file"
          placeholder="이미지 주소로 입력해주세요!"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>포지션</Label>
        <Input
          name="position"
          placeholder="Front, Back"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>blog 주소</Label>
        <Input
          name="blog"
          placeholder="개인 블로그 주소"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>github 주소</Label>
        <Input
          name="github"
          placeholder="Github 주소"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>위코드 시작일</Label>
        <Input
          name="beginDate"
          placeholder="ex) 2021.06.15"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>위코드 종료일</Label>
        <Input
          name="endDate"
          placeholder="ex) 2021.06.15"
          onChange={handleInput}
          required
        />
      </Content>
      <Content>
        <Label>생일</Label>
        <Input
          name="birthDay"
          placeholder="1993.06.05"
          onChange={handleInput}
          required
        />
      </Content>
      <SubmitBtn>수정</SubmitBtn>
    </Container>
  );
}

const Title = styled.div`
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
`;

const Container = styled.form`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  width: 80%;
  position: relative;
  padding: 40px;
  color: #212121;
`;
const Label = styled.label`
  margin-right: 15px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 300px;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 25px;
`;

const SubmitBtn = styled.button`
  position: absolute;
  right: -30px;
  bottom: 50px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  cursor: pointer;
`;
