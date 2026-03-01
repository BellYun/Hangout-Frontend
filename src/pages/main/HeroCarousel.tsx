import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface HeroCarouselProps {
  children: React.ReactNode;
}

const settings = {
  dots: false,
  infinite: true,
  fade: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const HeroCarousel = ({ children }: HeroCarouselProps) => {
  return <Slider {...settings}>{children}</Slider>;
};

export default HeroCarousel;
