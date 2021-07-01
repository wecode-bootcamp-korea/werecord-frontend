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
  margin: 0 20px;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  ${({ theme }) => theme.tablet`
    margin: 0 15px;
  `}

  &:hover {
    opacity: 0.6;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 12px;

    ${({ theme }) => theme.tablet`
      margin-top: 30px;
      width: 60px;
      height: 60px;
    `}
  }

  .profileName {
    position: relative;
    margin-top: 10px;
    font-size: ${({ theme }) => theme.pixelToRem(15)};

    ${({ theme }) => theme.tablet`
      font-size: 12px;
      color: ${({ theme }) => theme.colors.white};
    `}

    &:after {
      position: absolute;
      margin-left: 5px;
      top: 2px;
      width: 12px;
      height: 12px;
      content: '';
      border-radius: 50%;
      background-color: ${({ isOn, theme }) =>
        isOn ? theme.colors.blue : theme.colors.red};

      ${({ theme }) => theme.tablet`
        width: 7px;
        height: 7px;
      `}
    }
  }
`;
