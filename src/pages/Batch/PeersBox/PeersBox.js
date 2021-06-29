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
    <>
      <Container>
        <ScrollBoxTop>
          <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
          <ScrollBoxMentor onClick={() => setIsMentorModalOn(!isMentorModalOn)}>
            💁🏻‍♂️담임멘토
          </ScrollBoxMentor>
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

      <TabletContainer>
        <TableBottomTitle>출결 현황</TableBottomTitle>
        <PeersContainer>
          {myBatchInfo.peers.map(peers => (
            <div key={peers.peer_id} onClick={() => setPeerData(peers)}>
              <ProfileCard modalOn={setIsPeerModalOn} peersInfo={peers} />
            </div>
          ))}
        </PeersContainer>
      </TabletContainer>
    </>
  );
}

const Container = Styled.section`
  margin-top: 20px;
  padding: 30px;
  border-radius: 3px;
  background-color: #fefefe;

  ${({ theme }) => theme.tablet`
    display: none;
  `}
`;

const ScrollBoxTop = Styled.div`
  ${({ theme }) => theme.flexbox('row', 'space-between', 'center')}
`;

const ScrollBoxTitle = Styled.h1`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
`;

const ScrollBoxMentor = Styled.div`
  color: ${({ theme }) => theme.colors.black};
  font-size:15px;
  cursor:pointer;`;

const StyledSlider = Styled(Slider)`
  margin-top: 30px;
  color: ${({ theme }) => theme.colors.black};

  .slick-prev:before, .slick-next:before {
    color: black;
  }
`;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <i
      className={`fas fa-caret-left ${className}`}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const settings = {
  slide: 'li',
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  arrows: true,
  draggable: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4, slidesToScroll: 4, dots: true },
    },
  ],
};

const TabletContainer = Styled.section`
  display: none;

  ${({ theme }) => theme.tablet`
    display: block;
    ${({ theme }) => theme.flexbox('column', 'center', 'center')}
  `}
`;

const TableBottomTitle = Styled.h1`
  width: 100vw;
  margin-bottom: 20px;
  padding: 10px 5px;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const PeersContainer = Styled.ul`
  ${({ theme }) => theme.flexbox('row', 'center', 'center')};
  flex-wrap: wrap;
`;
