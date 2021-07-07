import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import RecheckDeleteModal from '../MentorPage/RecheckDeleteModal';
import API_URLS from '../../config';
import Button from '../../components/Button/Button';

export default function EditContents() {
  const [userForm, setUserForm] = useState({});
  const [imgFile, setImgFile] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const { name, position, blog, github, birthday } = userForm;
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <MainLogo>&gt;we-record</MainLogo>
        <ContentContainer>
          <Title>내 정보 수정 ✏️</Title>
          <Content>
            <Label>이름</Label>
            <Input
              name="name"
              placeholder="이름을 입력해주세요."
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
              <option value="Undefined">미정</option>
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="FullStack">FullStack</option>
            </SelectBox>
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
          <Content>
            <Label>Blog</Label>
            <Input
              name="blog"
              value={blog || ''}
              placeholder="블로그 주소를 입력해주세요."
              onChange={handleInput}
            />
          </Content>
          <Content>
            <Label>Github</Label>
            <Input
              name="github"
              value={github || ''}
              placeholder="Github 주소를 입력해주세요."
              onChange={handleInput}
            />
          </Content>
          <Button
            fontSize="12"
            clickEvent={modifyUserData}
            type="white"
            disabled={!userForm.name}
          >
            수정
          </Button>
          {/* <SubmitBtn onClick={modifyUserData}>수정</SubmitBtn> */}
          <LeaveBtn onClick={callbackIsModalOn}>탈퇴</LeaveBtn>
        </ContentContainer>
      </Container>

      {isModalOn && (
        <Modal>
          <RecheckDeleteModal deleteAccount={recheckLeave} />
        </Modal>
      )}
    </>
  );
}

const Title = styled.div`
  text-align: left;
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;

  ${({ theme }) => theme.tablet`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 17px;
`}
`;

const Container = styled.form`
  ${({ theme }) => theme.flexbox('row', 'center', 'center')}
  position: relative;
  margin: 80px 50px 50px 50px;
  color: #212121;

  ${({ theme }) => theme.tablet`
    margin: 0;
  `}
`;

const MainLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 0px;
  padding: 30px;

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const ContentContainer = styled.div`
  width: 50%;

  ${({ theme }) => theme.tablet`
    width: 90%;
  `}
`;

const Label = styled.label`
  font-size: 17px;
  margin-bottom: 10px;
  font-weight: 700;

  ${({ theme }) => theme.tablet`
    font-size: 14px;
  `}
`;

const Input = styled.input`
  font-size: 15px;
  width: 90%;
  padding-bottom: 5px;
  border-bottom: 1px solid black;
`;

const SelectBox = styled.select`
  width: 90%;
  padding: 3px 10px;
  font-size: 16px;
  outline: none;
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 25px;

  ${({ theme }) => theme.tablet`
    margin-bottom: 15px;
  `}
`;

const SelectBirthDay = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  width: 90%;
  padding: 5px;
  border-bottom: 1px solid black;
`;

const LeaveBtn = styled.div`
  position: relative;
  top: 30px;
  right: 330px;
  padding: 3px 3px;
  font-size: 12px;
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
