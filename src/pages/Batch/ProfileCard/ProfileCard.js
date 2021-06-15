import React from 'react';
import Styled from 'styled-components';

export default function Profile({ setOn }) {
  return (
    <ProfileCard onClick={() => setOn(true)}>
      <img alt="profile" src="/images/Profile/test1.jpeg" />
      <div className="profileName">김수연</div>
    </ProfileCard>
  );
}

const ProfileCard = Styled.li`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  margin: 0 20px;
  cursor: pointer;

  &:after {
      content: '';
      position: absolute;
      top: 3px;
      right: 8px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.green};
      z-index: 1;
    }

  &:hover {
    opacity: 0.6;
  }

  img {
    border-radius: 12px;
    width: 90%;
    height: 90%;
  }

  .profileName {
    margin-top: 10px;
    font-size: ${({ theme }) => theme.pixelToRem(20)};
  }
`;
