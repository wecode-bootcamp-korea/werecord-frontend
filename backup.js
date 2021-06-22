import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import styled from 'styled-components';
import API_URLS from '../../config';

export default function EditContents({ setOff }) {
  const [userForm, setUserForm] = useState({
    name: '',
    user_type: '',
    position: '',
    blog: '',
    github: '',
    birthday: '',
    profile_image_url: [],
  });
  const [userId, setUserId] = useState('');
  // arror&fix 사항 1(이미지 POST할 떄 수정안하면 초기화되는 현상)
  // const [imgFile, setImgFile] = useState('');
  const { name, position, blog, github, birthday } = userForm;
  const [isModalOn, setIsModalOn] = useState(false);

  useEffect(() => {
    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'GET',
      headers: {
        // Authorization: localStorage.getItem('wrtoken'),
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MjQzNTk1ODEsImV4cCI6MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNjI0MzU5NTgxfQ.8rMEhsdu0MLZyOAHVV3KYtnoLx8rPX7KcK4aCVc9pVY',
      },
    })
      .then(res => res.json())
      .then(userData => {
        const { name, position, blog, github, birthday, user_type, user_id } =
          userData.data;

        setUserForm(prev => ({
          ...prev,
          name,
          position,
          blog,
          github,
          birthday,
          user_type,
        }));
        setUserId(user_id);
      });
  }, []);

  const modifyUserData = e => {
    e.preventDefault();
    const userInfo = JSON.stringify(userForm);
    const userData = new FormData();
    userData.append('info', userInfo);
    // arror&fix 사항
    // userData.append('image', imgFile);

    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'POST',
      headers: {
        // Authorization: localStorage.getItem('wrtoken'),
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MjQzNTk1ODEsImV4cCI6MTAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAxNjI0MzU5NTgxfQ.8rMEhsdu0MLZyOAHVV3KYtnoLx8rPX7KcK4aCVc9pVY',
      },
      body: userData,
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(res => {
        console.log(res);
        alert('성공적으로 수정했습니다!');
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
      // arror&fix 사항
      // setImgFile(file);
      setUserForm(prev => ({
        ...prev,
        profile_image_url: file,
      }));
    };
  };

  const RecheckLeave = e => {
    e.preventDefault();

    fetch(`${API_URLS.MENTOR_INFO}`, {
      method: 'DELETE',
      header: {},
      body: JSON.stringify({
        user_id: { userId },
      }),
    });
  };

  console.log(userForm);

  return (
    <>
      <Container>
        <Content>
          <Title>마이 페이지 정보수정 📝</Title>
          <Label>이름</Label>
          <Input
            name="name"
            placeholder="이름을 입력해주세요"
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
            <option value="Undefined">Position</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="FullStack">Full Stack</option>
          </SelectBox>
        </Content>
        <Content>
          <Label>blog 주소</Label>
          <Input
            name="blog"
            value={blog || ''}
            placeholder="개인 블로그 주소"
            onChange={handleInput}
            required
          />
        </Content>
        <Content>
          <Label>github 주소</Label>
          <Input
            name="github"
            value={github || ''}
            placeholder="Github 주소"
            onChange={handleInput}
            required
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
      </Container>
      <LeaveBtn onClick={() => setIsModalOn(true)}>탈퇴</LeaveBtn>

      {isModalOn && (
        <Modal height="400px">
          <h1>리얼 탈퇴????</h1>
          <button type="button" onClick={RecheckLeave}>
            진짜 탈퇴??
          </button>
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

const LeaveBtn = styled.button`
  padding: 3px 3px;
  color: red;
  cursor: pointer;

  &:active {
    opacity: 0.3;
  }
`;
