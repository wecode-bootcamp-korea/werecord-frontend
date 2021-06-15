import React from 'react';
import Styled from 'styled-components';

export default function ProfileModal() {
  return (
    <ProfileModalStyle>
      <ModalTitle>Profile</ModalTitle>
      <UserCard>
        <img alt="user1" src="/images/Profile/test1.jpeg" />
        <div className="userInfo">
          <UserName>김수연</UserName>
          <UserBirth>생일 : 7월 2일</UserBirth>
        </div>
      </UserCard>
      <UserInfos>
        <Position>Position : 프론트엔드</Position>
        <GitAddress>
          GitHub :{' '}
          <a href="##" target="_blank">
            htt`asdlkfjdslfkjsalkfja
          </a>
        </GitAddress>
        <BlogAddress>
          Blog :{' '}
          <a href="##" target="_blank">
            asdlkfjlewhflkjsdalkfasdkfj
          </a>
        </BlogAddress>
      </UserInfos>
    </ProfileModalStyle>
  );
}

const ProfileModalStyle = Styled.section`
  color: ${({ theme }) => theme.colors.backgroundColor};
`;

const ModalTitle = Styled.h1`
  padding: 33px 0;
  border-bottom: 1px solid gray;
  font-size: ${({ theme }) => theme.pixelToRem(30)};
  color: ${({ theme }) => theme.colors.backgroundColor};
`;

const UserCard = Styled.div`
  ${({ theme }) => theme.flexbox('row')}
  margin-top: 40px;

  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }

  .userInfo {
    margin-left: 20px;
  }
`;

const UserName = Styled.div`
  font-size: 30px;
`;

const UserBirth = Styled.div`
  margin-top: 10px;
  font-size: 15px;
`;

const UserInfos = Styled.div`
  ${({ theme }) => theme.flexbox('column', 'flex-start', 'flex-start')};
  margin-top: 30px;
  padding: 30px;
  font-size: 25px;
`;

const Position = Styled.div``;

const GitAddress = Styled.div`
  margin-top: 15px;
`;

const BlogAddress = Styled.div`
  margin-top: 15px;
`;
