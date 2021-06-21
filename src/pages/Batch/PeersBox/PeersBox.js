import React, { useState } from 'react';
import Styled from 'styled-components';
import Slider from 'react-slick';
import ProfileCard from '../ProfileCard/ProfileCard';
import Modal from '../../../components/Modal/Modal';
import ProfileModal from '../ProfileModal/ProfileModal';

export default function PeersBox({ myBatchInfo }) {
  const [isModalOn, setIsModalOn] = useState(false);
  const [isMentorInfo, setIsMentorInfo] = useState(false);
  const [peerData, setPeerData] = useState({});

  const handleModal = e => {
    const isclickedInside = e.target.closest('.modal');
    const isclickedBtn = e.target.closest('.closeBtn');

    if (!isclickedInside) return setIsModalOn(false);
    if (isclickedBtn) return setIsModalOn(false);
  };

  const handleMontorModal = e => {
    const isclickedInside = e.target.closest('.modal');
    const isclickedBtn = e.target.closest('.closeBtn');

    if (!isclickedInside) return setIsMentorInfo(false);
    if (isclickedBtn) return setIsMentorInfo(false);
  };

  return (
    <Container>
      <ContainerTop>
        <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
        <Responsibility
          onClick={() => {
            setIsMentorInfo(true);
          }}
        >
          담당멘토
        </Responsibility>
      </ContainerTop>
      <StyledSlider {...settings}>
        {myBatchInfo.peers.map(peers => (
          <div key={peers.peer_id} onClick={() => setPeerData(peers)}>
            <ProfileCard setOn={setIsModalOn} peersInfo={peers} />
          </div>
        ))}
      </StyledSlider>

      {isModalOn && (
        <Modal setOff={handleModal} height="480px">
          <ProfileModal peersInfo={peerData} />
        </Modal>
      )}

      {isMentorInfo && (
        <Modal setOff={handleMontorModal} height="480px">
          <ProfileModal peersInfo={peerData} />
        </Modal>
      )}
    </Container>
  );
}

const Container = Styled.section`
  margin-top: 20px;
  padding: 30px;
  border-radius: 12px;
  background-color: rgba(222, 222, 222, 0.1);
`;

const ContainerTop = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between')}
`;

const Responsibility = Styled.div`
  cursor: pointer;
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
