import React, { useCallback } from 'react';
import Styled from 'styled-components';

export default function ProfileCard({ modalOn, peersInfo }) {
  const { peer_status, peer_name, peer_profile_image_url } = peersInfo;
  const onProfileModal = useCallback(() => {
    modalOn(true);
  }, []);

  return (
    <Container onClick={onProfileModal} isOn={peer_status}>
      <img alt={peer_name} src={peer_profile_image_url} />
      <div className="profileName">{peer_name}님</div>
    </Container>
  );
}

const Container = Styled.li`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  color: ${({ theme }) => theme.colors.black};
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
      background-color: ${({ isOn, theme }) =>
        isOn ? theme.colors.blue : theme.colors.red};
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
    font-size: ${({ theme }) => theme.pixelToRem(15)};
  }
`;
