import React, { useCallback } from 'react';
import Styled from 'styled-components';

export default function ProfileCard({ setOn, peersInfo }) {
  const { peer_status, peer_name, peer_profile_image_url } = peersInfo;
  const onProfileModal = useCallback(() => {
    setOn(true);
  }, []);

  return (
    <Container onClick={onProfileModal} isOn={peer_status}>
      <img alt={peer_name} src={peer_profile_image_url} />
      <div className="profileName">{peer_name}</div>
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