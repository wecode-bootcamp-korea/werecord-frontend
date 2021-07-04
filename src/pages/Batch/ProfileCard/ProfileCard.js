import React, { useCallback } from 'react';
import Styled from 'styled-components';

export default function ProfileCard({ modalOn, peersInfo }) {
  const { peer_status, peer_name, peer_profile_image_url } = peersInfo;
  const onProfileModal = useCallback(() => {
    modalOn(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  color: ${({ theme }) => theme.colors.black};
  margin: 0 20px;
  cursor: pointer;

  ${({ theme }) => theme.tablet`
    margin: 0 15px;
  `}

  &:hover {
    opacity: 0.6;
  }

  img {
    border-radius: 12px;
    width: 100px;
    height: 100px;

    ${({ theme }) => theme.tablet`
      margin-top: 30px;
      width: 60px;
      height: 60px;
    `}
  }

  .profileName {
    margin-top: 10px;
    position: relative;
    font-size: ${({ theme }) => theme.pixelToRem(15)};

    ${({ theme }) => theme.tablet`
      font-size: 12px;
      color: ${({ theme }) => theme.colors.white};
    `}

    &:after {
      content: '';
      position: absolute;
      top: 2px;
      margin-left: 5px;
      width: 12px;
      height: 12px;
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
