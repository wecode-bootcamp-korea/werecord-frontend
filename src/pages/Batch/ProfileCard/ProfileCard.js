import React from 'react';
import Styled from 'styled-components';

export default function ProfileCard({ modalOn, peersInfo }) {
  const { peer_status, peer_name, peer_profile_image_url } = peersInfo;

  return (
    <Container onClick={modalOn} isOn={peer_status}>
      <img alt={peer_name} src={peer_profile_image_url} />
      <div className="profileName">{peer_name}</div>
      <IsOn />
    </Container>
  );
}

const Container = Styled.li`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  margin-top: 30px;
  width: 80px;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  .profileName {
    margin-top: 10px;
    font-size: ${({ theme }) => theme.pixelToRem(15)};
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const IsOn = Styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.purple};
`;
