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
      <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
      <Container>
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
    </>
  );
}

const Container = Styled.section`
  height: 160px;
  margin-top: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ScrollBoxTitle = Styled.h1`
  margin-top: 42px;
  margin-left: 20px;
  font-size: ${({ theme }) => theme.pixelToRem(15)};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.6;
`;

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
  slidesToShow: 8,
  slidesToScroll: 8,
  arrows: true,
  draggable: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 6, slidesToScroll: 6, dots: true },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 4, slidesToScroll: 4, dots: true },
    },
  ],
};

const MobileContainer = Styled.section`
  display: none;

  ${({ theme }) => theme.mobile`
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
