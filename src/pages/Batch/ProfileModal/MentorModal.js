import React from 'react';
import Styled from 'styled-components';

export default function MentorModal({ mentorInfo }) {
  const {
    mentor_name,
    mentor_birthday,
    mentor_position,
    mentor_email,
    mentor_github,
    mentor_blog,
    mentor_profile_image_url,
  } = mentorInfo;

  return (
    <Container>
      <ModalTitle>Profile</ModalTitle>
      <UserCard>
        <img alt="user1" src={mentor_profile_image_url} />
        <div className="userInfo">
          <UserName>{mentor_name}</UserName>
          <UserBirth>{`생일 : ${
            mentor_birthday === null ? '언제일까용' : mentor_birthday
          }`}</UserBirth>
        </div>
      </UserCard>
      <UserInfo>
        <Position>{`Position : ${mentor_position}`}</Position>
        <EmailAddress>{`Email : ${mentor_email}`}</EmailAddress>
        <GitAddress>
          GitHub :{' '}
          <a href="##" target="_blank">
            {mentor_github}
          </a>
        </GitAddress>
        <BlogAddress>
          Blog :{' '}
          <a href="##" target="_blank">
            {mentor_blog}
          </a>
        </BlogAddress>
      </UserInfo>
    </Container>
  );
}

const Container = Styled.section`
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

const UserInfo = Styled.div`
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
