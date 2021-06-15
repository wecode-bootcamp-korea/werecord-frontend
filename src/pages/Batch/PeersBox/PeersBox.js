import React, { useState } from 'react';
import Styled from 'styled-components';
import ProfileCard from '../ProfileCard/ProfileCard';
import Modal from '../../../components/Modal/Modal';
import ProfileModal from '../ProfileModal/ProfileModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function PeersBox({ myBatchInfo }) {
  const [isOn, setIsOn] = useState(false);
  const [modalNum, setModalNum] = useState('');

  const handleModal = e => {
    const clickedInside = e.target.closest('.modal');
    const clickedBtn = e.target.closest('.closeBtn');

    if (clickedInside) {
      if (clickedBtn) {
        setIsOn(!isOn);
      }
      if (!clickedBtn) {
        return;
      }
    } else {
      setIsOn(false);
    }
  };

  const settings = {
    slide: 'li',
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    draggable: true,
  };

  return (
    <PeersBoxArea>
      <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
      <StyledSlider {...settings}>
        {myBatchInfo.peers.map(peers => (
          <div key={peers.peer_id} onClick={() => setModalNum(peers.peer_id)}>
            <ProfileCard setOn={setIsOn} peersInfo={peers} />
            {isOn && (
              <Modal isOn={isOn} setOff={handleModal} height="450px">
                <ProfileModal peersInfo={myBatchInfo.peers[modalNum - 1]} />
              </Modal>
            )}
          </div>
        ))}
      </StyledSlider>
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
