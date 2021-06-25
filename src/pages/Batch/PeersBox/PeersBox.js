import React, { useState } from 'react';
import Slider from 'react-slick';
import Styled from 'styled-components';
import ProfileCard from '../ProfileCard/ProfileCard';
import Modal from '../../../components/Modal/Modal';
import ProfileModal from '../ProfileModal/ProfileModal';
import MentorModal from '../ProfileModal/MentorModal';

export default function PeersBox({ myBatchInfo }) {
  const [isPeerModalOn, setIsPeerModalOn] = useState(false);
  const [isMentorModalOn, setIsMentorModalOn] = useState(false);
  const [peerData, setPeerData] = useState({});

  return (
    <Container>
      <ScrollBoxTop>
        <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
        <div onClick={() => setIsMentorModalOn(!isMentorModalOn)}>담임멘토</div>
      </ScrollBoxTop>
      <StyledSlider {...settings}>
        {myBatchInfo.peers.map(peers => (
          <div key={peers.peer_id} onClick={() => setPeerData(peers)}>
            <ProfileCard modalOn={setIsPeerModalOn} peersInfo={peers} />
          </div>
        ))}
      </StyledSlider>
      {isPeerModalOn && (
        <Modal setOff={setIsPeerModalOn}>
          <ProfileModal peersInfo={peerData} />
        </Modal>
      )}
      {isMentorModalOn && (
        <Modal setOff={setIsMentorModalOn}>
          <MentorModal mentorInfo={myBatchInfo.mentor} />
        </Modal>
      )}
    </Container>
  );
}

const Container = Styled.section`
  margin-top: 20px;
  padding: 30px;
  border-radius: 3px;
  background-color: #fefefe;
`;

const ScrollBoxTop = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')}
`;

const ScrollBoxTitle = Styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;

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
