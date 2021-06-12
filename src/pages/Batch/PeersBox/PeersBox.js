import React from 'react';
import Styled from 'styled-components';
import Profile from '../Profile/Profile';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function PeersBox() {
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
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
        <Profile />
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
