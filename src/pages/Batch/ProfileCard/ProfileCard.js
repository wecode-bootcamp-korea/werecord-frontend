import React from 'react';
import Styled from 'styled-components';
import findDefaultImg from '../../Util/findDefaultImg';

export default function ProfileCard({ peersInfo }) {
  const { peer_status, peer_name, peer_profile_image_url } = peersInfo;

  return (
    <Container isOn={peer_status}>
      <img alt={peer_name} src={findDefaultImg(peer_profile_image_url)} />
      <div className="profileName">{peer_name}</div>
      <IsOn isOn={peer_status} />
    </Container>
  );
}

const Container = Styled.li`
  ${({ theme }) => theme.flexbox('column')};
  position: relative;
  margin: 30px auto;
  width: 80px;
  color: ${({ theme }) => theme.colors.black};

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

  ${({ isOn }) => !isOn && `display: none`};
`;
