import React from 'react';
import styled from 'styled-components';

const MadeByModal = props => {
  return (
    <Container>
      <MainLogo>&gt;we-record</MainLogo>
      <MemberContainer>
        <Title>we-record팀을 소개합니다 !</Title>
        <IntroduceContainer>
          <Content>Front-end</Content>
          <ProfileContainer>
            <Name>김수연</Name>
            <GitAddress href="" target="_blank">
              <i className="fab fa-github-square"></i>
            </GitAddress>
            <BlogAddress>
              <i className="fab fa-vimeo"></i>
            </BlogAddress>
          </ProfileContainer>
          <ProfileContainer>
            <Name>이다슬</Name>
            <GitAddress href="" target="_blank">
              <i className="fab fa-github-square"></i>
            </GitAddress>
            <BlogAddress href="" target="">
              <i className="fab fa-vimeo"></i>
            </BlogAddress>
          </ProfileContainer>
          <ProfileContainer>
            <Name>전용민</Name>
            <GitAddress href="" target="_blank">
              <i className="fab fa-github-square"></i>
            </GitAddress>
            <BlogAddress>
              <i className="fab fa-vimeo"></i>
            </BlogAddress>
          </ProfileContainer>
        </IntroduceContainer>
        <IntroduceContainer>
          <Content>Back-end</Content>
          <ProfileContainer>
            <Name>양미화</Name>
            <GitAddress href="" target="_blank">
              <i className="fab fa-github-square"></i>
            </GitAddress>
            <BlogAddress>
              <i className="fab fa-vimeo"></i>
            </BlogAddress>
          </ProfileContainer>
          <ProfileContainer>
            <Name>최대환</Name>
            <GitAddress href="" target="_blank">
              <i className="fab fa-github-square"></i>
            </GitAddress>
            <BlogAddress>
              <i className="fab fa-vimeo"></i>
            </BlogAddress>
          </ProfileContainer>
        </IntroduceContainer>
      </MemberContainer>
    </Container>
  );
};

export default MadeByModal;

const Container = styled.section`
  ${({ theme }) => theme.flexbox('row', 'center', 'center')}
  padding: 50px;
  color: black;
`;

const MainLogo = styled.div`
  font-weight: 700;
  font-size: 25px;
  margin-right: 30px;
  width: 50%;
`;

const MemberContainer = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  width:75%;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 20px;

  ${({ theme }) => theme.mobile`
    font-size: 16px;
    line-height: 1.2;
  `}
`;

const ProfileContainer = styled.div`
  ${({ theme }) => theme.flexbox('row', 'start', 'start')}

  i {
    width: 20px;
    color: black;
    margin-right: 5px;

    ${({ theme }) => theme.mobile`
      margin-right: 0;
      font-size: 13px;
    `}
  }
`;
const IntroduceContainer = styled.div`
  ${({ theme }) => theme.flexbox('column', 'start', 'start')}
  margin:10px 0;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
  margin-bottom: 5px;

  ${({ theme }) => theme.mobile`
    font-size: 14px;
  `}
`;

const Name = styled.div`
  font-size: 15px;
  margin-bottom: 3px;

  ${({ theme }) => theme.mobile`
    font-size: 13px;
  `}
`;

const GitAddress = styled.a`
  font-size: 13px;
`;

const BlogAddress = styled.a`
  font-size: 13px;
`;
