import React from 'react';
import Slider from 'react-slick';
import Styled from 'styled-components';
import ProfileCard from '../ProfileCard/ProfileCard';

export default function PeersBox({ myBatchInfo }) {
  const settings = {
    slide: 'li',
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <ScrollBoxTitle>출결 현황</ScrollBoxTitle>
      <Container>
        <StyledSlider {...settings}>
          {myBatchInfo.peers.map(peers => (
            <div key={peers.peer_id}>
              <ProfileCard peersInfo={peers} />
            </div>
          ))}
        </StyledSlider>
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
  .slick-prev:before, .slick-next:before {
    color: ${({ theme }) => theme.colors.purple};
  }
`;
