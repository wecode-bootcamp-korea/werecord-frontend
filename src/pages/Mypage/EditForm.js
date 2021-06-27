import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import RecheckDeleteModal from '../MentorPage/RecheckDeleteModal';
import API_URLS from '../../config';

export default function EditContents() {
  const [userForm, setUserForm] = useState({});
  const [imgFile, setImgFile] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const { name, position, blog, github, birthday } = userForm;
  const callbackIsModalOn = useCallback(() => setIsModalOn(true), [isModalOn]);

  useEffect(() => {
    getUserDataFetch(setUserForm);
  }, []);

  const modifyUserData = e => {
    e.preventDefault();
    sendImgData(userForm, imgFile);
  };

  const handleInput = e => {
    const { name, value } = e.target;
    const nextUserForm = { ...userForm, [name]: value };
    setUserForm(nextUserForm);
  };

  const onFileInput = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgFile(file);
    };
  };

  return (
    <>
      <Container>
        <Title>마이 페이지 정보수정 📝</Title>
        <MainLogo>&gt;we-record</MainLogo>
        <Content>
          <Label>이름</Label>
          <Input
            name="name"
            placeholder="이름을 입력해주세요"
            value={name || ''}
            onChange={handleInput}
          />
        </Content>
        <Content>
          <Label>사진</Label>
          <Input
            name="image"
            type="file"
            accept="image/*"
            placeholder="이미지 주소로 입력해주세요!"
            onChange={onFileInput}
          />
        </Content>
        <Content>
          <Label>포지션</Label>
          <SelectBox
            name="position"
            value={position || ''}
            onChange={handleInput}
          >
            <option value="Undefined">Position</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="FullStack">Full Stack</option>
          </SelectBox>
        </Content>
        <Content>
          <Label>Blog 주소</Label>
          <Input
            name="blog"
            value={blog || ''}
            placeholder="개인 블로그 주소"
            onChange={handleInput}
          />
        </Content>
        <Content>
          <Label>github 주소</Label>
          <Input
            name="github"
            value={github || ''}
            placeholder="Github 주소"
            onChange={handleInput}
          />
        </Content>
        <Content>
          <Label>생일</Label>
          <SelectBirthDay>
            <input
              type="date"
              name="birthday"
              value={birthday || ''}
              onChange={handleInput}
              max="2100-01-01"
            />
          </SelectBirthDay>
        </Content>
        <SubmitBtn onClick={modifyUserData}>수정</SubmitBtn>
        <LeaveBtn onClick={callbackIsModalOn}>탈퇴</LeaveBtn>
      </Container>

      {isModalOn && (
        <Modal height="200px">
          <RecheckDeleteModal deleteAccount={recheckLeave} />
        </Modal>
      )}
    </>
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

const MainLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  color: ${({ theme }) => theme.colors.black};
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

const SelectBox = styled.select`
  width: 300px;
  padding: 3px 10px;
  font-size: 16px;
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 25px;
`;

const SelectBirthDay = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  width: 300px;
  padding: 5px;
  border-bottom: 1px solid black;
`;

const SubmitBtn = styled.button`
  position: absolute;
  right: -30px;
  bottom: 50px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;
  cursor: pointer;
`;

const LeaveBtn = styled.div`
  padding: 3px 3px;
  color: red;
  cursor: pointer;

  &:active {
    opacity: 0.3;
  }
`;

const getUserDataFetch = setUserForm => {
  fetch(`${API_URLS.EDIT_PROFILE}`, {
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  })
    .then(res => res.json())
    .then(({ data }) => {
      setUserForm(data);
    });
};

const recheckLeave = e => {
  e.preventDefault();
  fetch(`${API_URLS.EDIT_PROFILE}`, {
    method: 'DELETE',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  }).then(res => {
    if (res.status === 204) {
      alert('성공적으로 탈퇴되었습니다!');
      sessionStorage.clear();
      window.location.replace('/');
    }
  });
};

const sendImgData = (userForm, imgFile) => {
  const userInfo = JSON.stringify(userForm);
  const userData = new FormData();
  userData.append('info', userInfo);
  userData.append('image', imgFile);

  fetch(`${API_URLS.EDIT_PROFILE}`, {
    method: 'POST',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
    body: userData,
  })
    .then(res => res.json())
    .then(
      ({ message }) =>
        message === 'SUCCESS' && window.location.replace('/mypage')
    );
};
