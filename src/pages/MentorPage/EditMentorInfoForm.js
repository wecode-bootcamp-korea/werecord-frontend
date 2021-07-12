import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import styled from 'styled-components';
import API_URLS from '../../config';
import RecheckDeleteModal from './RecheckDeleteModal';
import Button from '../../components/Button/Button';

export default function EditContents({ isModalOff }) {
  const [userForm, setUserForm] = useState({
    name: '',
    user_type: '',
    position: '',
    blog: '',
    batch: '',
    github: '',
    birthday: '',
    profile_image_url: [],
  });
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState('');
  const [imgFile, setImgFile] = useState('');
  const { name, position, blog, github, birthday } = userForm;
  const [recheckDelete, setRecheckDelete] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    })
      .then(res => res.json())
      .then(userData => {
        if (userData.message === 'REFRESH_TOKEN_EXPIRED') {
          sessionStorage.clear();
          history.push('/');
        } else {
          const {
            name,
            position,
            blog,
            github,
            batch,
            birthday,
            user_type,
            user_id,
          } = userData.data;

          setUserForm(prev => ({
            ...prev,
            name,
            position,
            blog,
            batch,
            github,
            birthday,
            user_type,
          }));
          setUserId(user_id);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modifyUserData = e => {
    e.preventDefault();
    const userInfo = JSON.stringify(userForm);
    const userData = new FormData();
    userData.append('info', userInfo);
    userData.append('image', imgFile);

    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'POST',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
      body: userData,
    })
      .then(res => res.json())
      .then(({ message }) => {
        if (message === 'SUCCESS') {
          alert('성공적으로 수정했습니다!');
          isModalOff();
        }
      });
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
      setUserForm(prev => ({
        ...prev,
        profile_image_url: file,
      }));
    };
  };

  const recheckLeave = e => {
    e.preventDefault();
    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('wrtoken'),
      },
    }).then(res => {
      if (res.status === 204) {
        alert('정상적으로 탈퇴가 처리되었습니다!');
        isModalOff();
        sessionStorage.clear();
        window.location.replace('/');
      }
    });
  };

  return (
    <>
      <Container>
        <MainLogo>&gt;we-record</MainLogo>
        <ContentContainer>
          <Title>멘토 정보 수정 ✏️</Title>
          <Content>
            <Label>이름</Label>
            <Input
              name="name"
              placeholder="이름을 입력해주세요."
              value={name || ''}
              onChange={handleInput}
              required
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
              required
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
              <option value="FullStack">Full Stack</option>
            </SelectBox>
          </Content>
          <Content>
            <Label>생일</Label>
            <SelectBirthDay>
              s
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
              required
            />
          </Content>
          <Content>
            <Label>Github</Label>
            <Input
              name="github"
              value={github || ''}
              placeholder="Github 주소를 입력해주세요."
              onChange={handleInput}
              required
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
        </ContentContainer>
      </Container>
      <LeaveBtn onClick={() => setRecheckDelete(true)}>탈퇴</LeaveBtn>

      {recheckDelete && (
        <Modal setOff={setRecheckDelete}>
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

  ${({ theme }) => theme.mobile`
    font-size: 16px;
    margin-bottom: 20px;
  `}
`;

const Container = styled.form`
  ${({ theme }) => theme.flexbox('row', 'center', 'center')}
  position: relative;
  margin: 80px 50px 50px 50px;
  color: #212121;

  ${({ theme }) => theme.mobile`
    margin: 10px;
  `}
`;

const MainLogo = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(25)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin-right: 0px;
  padding: 30px;

  ${({ theme }) => theme.mobile`
    display: none;
  `}
`;

const ContentContainer = styled.div`
  width: 50%;

  ${({ theme }) => theme.mobile`
    width: 80%;
  `}
`;

const Label = styled.label`
  font-size: 17px;
  margin-bottom: 10px;
  font-weight: 700;

  ${({ theme }) => theme.mobile`
    font-size: 12px;
    margin-bottom: 7px;
  `}
`;

const Input = styled.input`
  font-size: 15px;
  width: 90%;
  padding-bottom: 5px;
  border-bottom: 1px solid black;

  ${({ theme }) => theme.mobile`
    width: 100%;
    font-size: 11px;
  `}
`;

const SelectBox = styled.select`
  width: 90%;
  padding: 3px 10px;
  font-size: 16px;
  outline: none;

  ${({ theme }) => theme.mobile`
    font-size: 11px;
  `}
`;

const Content = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin-bottom: 25px;
`;

const SelectBirthDay = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start', 'center')}
  width: 90%;
  padding: 5px;
  border-bottom: 1px solid black;

  ${({ theme }) => theme.mobile`
    font-size: 11px;
  `}
`;

const LeaveBtn = styled.div`
  position: relative;
  bottom: 20px;
  right: 230px;
  padding: 3px 3px;
  font-size: 12px;
  color: red;
  cursor: pointer;

  &:active {
    opacity: 0.3;
  }

  ${({ theme }) => theme.mobile`
    position: static;
  `}
`;
