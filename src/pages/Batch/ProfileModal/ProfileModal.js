import React from 'react';
import Styled from 'styled-components';

export default function ProfileModal({ peersInfo }) {
  return (
    <ProfileModalStyle>
      <ModalTitle>Profile</ModalTitle>
      <UserCard>
        <img alt="user1" src="/images/Profile/test1.jpeg" />
        <div className="userInfo">
          <UserName>{peersInfo.peer_name}</UserName>
          <UserBirth>생일 : {peersInfo.peer_birthday}</UserBirth>
        </div>
      </UserCard>
      <UserInfos>
        <Position>Position : {peersInfo.peer_position}</Position>
        <EmailAddress>Email : {peersInfo.peer_email}</EmailAddress>
        <GitAddress>
          GitHub :
          <a href="##" target="_blank">
            {peersInfo.peer_github}
          </a>
        </GitAddress>
        <BlogAddress>
          Blog :
          <a href="##" target="_blank">
            {peersInfo.peer_blog}
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

const EmailAddress = Styled.div`
  margin-top: 15px;
`;

const GitAddress = Styled.div`
  margin-top: 15px;
`;

const BlogAddress = Styled.div`
  margin-top: 15px;
`;
