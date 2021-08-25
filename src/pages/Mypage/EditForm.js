import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import RecheckDeleteModal from '../MentorPage/RecheckDeleteModal';
import API_URLS from '../../config';

export default function EditContents() {
  const [userForm, setUserForm] = useState({});
  const [imgFile, setImgFile] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const { name, position } = userForm;

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
        <ReviseButton onClick={modifyUserData} disabled={!userForm.name}>
          수정
        </ReviseButton>
        <LeaveBtn onClick={() => setIsModalOn(true)}>탈퇴</LeaveBtn>
      </Container>

      {isModalOn && (
        <Modal>
          <RecheckDeleteModal
            deleteAccount={() => {
              recheckLeave();
            }}
          />
        </Modal>
      )}
    </>
  );
}

const Title = styled.div`
  margin-bottom: 35px;
  font-size: ${({ theme }) => theme.pixelToRem(20)};
  font-weight: 700;

  ${({ theme }) => theme.mobile`
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 17px;
`}
`;

const Container = styled.form`
  position: relative;
  margin: 50px 30px;
  color: #212121;

  ${({ theme }) => theme.mobile`
    width: 90%;
    margin: 0;
  `}
`;

const Label = styled.label`
  font-size: 17px;
  margin-bottom: 10px;
  font-weight: 700;

  ${({ theme }) => theme.mobile`
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

  ${({ theme }) => theme.mobile`
    margin-bottom: 15px;
  `}
`;

const ReviseButton = styled.button`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.9;
  }
`;

const LeaveBtn = styled.div`
  position: absolute;
  bottom: -30px;
  right: 0;
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
    .then(({ data, message }) => {
      if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        window.location.href = '/';
      } else {
        setUserForm(data);
      }
    });
};

const recheckLeave = () => {
  fetch(`${API_URLS.EDIT_PROFILE}`, {
    method: 'DELETE',
    headers: {
      Authorization: sessionStorage.getItem('wrtoken'),
    },
  }).then(({ status }) => {
    if (status === 401) {
      window.location.href = '/';
    } else if (status === 204) {
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
    .then(({ message }) => {
      if (message === 'SUCCESS') {
        window.location.replace('/mypage');
      } else if (message === 'REFRESH_TOKEN_EXPIRED') {
        sessionStorage.clear();
        window.location.href = '/';
      }
    });
};
