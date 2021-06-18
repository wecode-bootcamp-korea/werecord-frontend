import React from 'react';
import Styled from 'styled-components';

export default function ProfileCard({ setOn, peersInfo }) {
  return (
    <Container onClick={() => setOn(true)} isOn={peersInfo.peer_status}>
      <img alt={peersInfo.peer_name} src={peersInfo.peer_profile_image_url} />
      <div className="profileName">{peersInfo.peer_name}</div>
    </Container>
  );
}

const Container = Styled.li`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  margin: 0 20px;
  cursor: pointer;

  &:after {
      content: '';
      position: absolute;
      top: 3px;
      right: 8px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${props => (props.isOn ? '#41b979' : '#f6f4f1')};
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
