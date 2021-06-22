import React, { useState } from 'react';
import Styled from 'styled-components';
import Slider from 'react-slick';
import ProfileCard from '../ProfileCard/ProfileCard';
import Modal from '../../../components/Modal/Modal';
import ProfileModal from '../ProfileModal/ProfileModal';

export default function PeersBox({ myBatchInfo }) {
  const [isModalOn, setIsModalOn] = useState(false);
  const [peerData, setPeerData] = useState({});

  return (
    <PeersBoxArea>
      <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
      <StyledSlider {...settings}>
        {myBatchInfo.peers.map(peers => (
          <div key={peers.peer_id} onClick={() => setPeerData(peers)}>
            <ProfileCard modalOn={setIsModalOn} peersInfo={peers} />
          </div>
        ))}
      </StyledSlider>

      {isModalOn && (
        <Modal setOff={setIsModalOn} height="480px">
          <ProfileModal peersInfo={peerData} />
        </Modal>
      )}
    </PeersBoxArea>
  );
}

const PeersBoxArea = Styled.section`
  margin-top: 20px;
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(222, 222, 222, 0.1);
`;

const ScrollBoxTitle = Styled.h1`
  font-size: 20px;
`;

const StyledSlider = Styled(Slider)`
  margin-top: 30px;
`;

const settings = {
  slide: 'li',
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 8,
  draggable: true,
};
