import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import RadioBtn from './components/RadioBtn';
import TextInput from './components/TextInput';
import API_URLS from '../../config';

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    user_type: '',
    name: '',
    batch: '',
    position: '',
  });
  const [checkUserType, setCheckUserType] = useState('');
  const history = useHistory();

  useEffect(() => {
    switch (sessionStorage.user_type) {
      case '수강생':
        setCheckUserType('수강생');
        break;
      case '멘토':
        setCheckUserType('멘토');
        break;
      default:
        new Error('SessionStorage has not user_type');
    }
  }, []);

  //입력 완료 버튼 클릭가능하게 할지
  const isAbleButton = () => {
    const { user_type, name, batch, position } = userInfo;

    switch (user_type) {
      case '수강생':
        return Boolean(name && batch && position);
      case '멘토':
        return Boolean(name && position);
      default:
        return false;
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
      .then(({ message, user_info: { user_type, batch } }) => {
        sessionStorage.setItem('user_type', user_type);
        sessionStorage.setItem('batch', batch);

        if (message === 'SUCCESS') {
          if (user_type === '수강생') history.push('/main');
          if (user_type === '멘토') history.push('/mentorpage');
        }
      });
  };

  const USER_TYPES = [
    { id: 'student', value: '수강생', text: '학생' },
    { id: 'mentor', value: '멘토', text: '멘토' },
  ];
  const USER_POSITION = [{ id: 'Front-end' }, { id: 'Back-end' }];
  const USER_NAME_AND_BATCH = [
    { title: '이름', hasValue: userInfo.name, inputName: 'name', type: 'text' },
    {
      title: '기수',
      hasValue: userInfo.batch,
      inputName: 'batch',
      onDisabled: isAbleInput(),
      type: 'number',
    },
  ];

  return (
    <>
      <UserTypeBtns>
        <InputTitle>사용자*</InputTitle>
        <RadioBtns>
          {USER_TYPES.map(({ id, value, text }, idx) => (
            <RadioBtn
              getInputValue={getInputValue}
              id={id}
              value={value}
              disabled={value !== checkUserType}
              btnName="user_type"
              userType={userInfo.user_type}
              text={text}
              key={idx}
            />
          ))}
        </RadioBtns>
      </UserTypeBtns>
      <TextInputs>
        {USER_NAME_AND_BATCH.map(
          ({ title, hasValue, inputName, onDisabled, type }, idx) => (
            <NameAndBatch key={idx}>
              <InputTitle>{title}</InputTitle>
              <TextInput
                hasValue={hasValue}
                getInputValue={getInputValue}
                onDisabled={onDisabled}
                inputName={inputName}
                type={type}
              />
            </NameAndBatch>
          )
        )}
      </TextInputs>
      <PositionBtns>
        <InputTitle>포지션*</InputTitle>
        <RadioBtns>
          {USER_POSITION.map(({ id }, idx) => (
            <RadioBtn
              getInputValue={getInputValue}
              id={id}
              btnName="position"
              value={id}
              text={id}
              position={userInfo.position}
              key={idx}
            />
          ))}
        </RadioBtns>
      </PositionBtns>
      <BtnArea>
        <LoginBtn disabled={!isAbleButton()} onClick={postUserData}>
          We Record 시작하기
        </LoginBtn>
      </BtnArea>
    </>
  );
}

const UserTypeBtns = styled.div`
  margin-top: 42px;

  ${({ theme }) => theme.mobile`
    margin-top: 20px;
  `}
`;

const InputTitle = styled.div`
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  font-family: Noto Sans KR;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  opacity: 0.6;

  ${({ theme }) => theme.mobile`
    font-size: ${({ theme }) => theme.pixelToRem(8)};
  `}
`;

const RadioBtns = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
  margin-top: 2px;
`;

const TextInputs = styled.div`
  ${({ theme }) => theme.flexbox('row', 'flex-start')};
  margin-top: 20px;

  ${({ theme }) => theme.mobile`
    margin-top: 10px;
  `}
`;

const NameAndBatch = styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};

  &:last-child {
    margin-left: 20px;

    ${({ theme }) => theme.mobile`
      margin-left: 16px;
    `}
  }
`;

const PositionBtns = styled.div`
  margin-top: 20px;

  ${({ theme }) => theme.mobile`
    margin-top: 10px;
  `}
`;

const BtnArea = styled.div`
  ${({ theme }) => theme.mobile`
    ${({ theme }) => theme.flexbox('column')};
    width: 100%;
  `}
`;

const LoginBtn = styled.button`
  margin-top: 50px;
  padding: 8px 46px;
  border: 1px solid ${({ theme }) => theme.colors.regularBtnFontColorWhite};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(24)};
  font-weight: 700;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.fontColorWhite};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.fontColorPurple};
    background: ${({ theme }) => theme.colors.hoverBtnBgWhite};

    ${({ disabled }) =>
      disabled &&
      `background: rgba(255, 255, 255, 0.3); border-color: rgba(255, 255, 255, 0.3); color: #ffffff`};
  }

  ${({ disabled }) =>
    disabled &&
    `background: rgba(255, 255, 255, 0.3); border-color: rgba(255, 255, 255, 0.3); cursor: not-allowed`};

  ${({ theme }) => theme.mobile`
    margin-top: 50px;
    padding: 4px 23px;
    font-size: ${({ theme }) => theme.pixelToRem(16)};
  `}
`;
