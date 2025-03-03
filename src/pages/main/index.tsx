import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Content from './Contents';
import trip1 from '../../assets/image/trip1.webp';
import trip2 from '../../assets/image/trip2.webp';
import trip3 from '../../assets/image/trip3.webp';
import '../../assets/font/font.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const items = [
  { id: 1, url: trip1 },
  { id: 2, url: trip2 },
  { id: 3, url: trip3 },
];

interface ImageContainerProps {
  imageUrl: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100rem;
  height: 33.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleContainer = styled.div`
  margin-top: 13rem;

  width: 100%;
  height: 5rem;
  color: #f9f4f4;
  justify-content: center;
  line-height: 2rem;
  font-weight: 1000;
  font-size: 1.8rem;
  text-align: center;
  font-family: 'SUITE-Regular';
  overflow: visible;
`;

const Highlight = styled.span`
  color: #3baaf8;
  font-weight: 1000;
`;

const WriteButton = styled.button`
  width: 200px;
  height: 120px;
  background-color: #3baaf8;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  transition: transform 0.7s;
  &:hover {
    background-color: #55b2f5;
    cursor: pointer;
    transform: scale(1.03);
  }
  z-index: 999;
`;

const WriteLayout = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const TextContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
  overflow: visible;
  text-align: center;
  line-height: 1.5rem; //문장 상하 간격
  color: white;
  font-family: 'SUITE-Regular';
  overflow: visible;
`;

const Main = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true, //무한 반복 옵션
    fade: true,
    speed: 2000,
    slidesToShow: 1, //한 화면에 보여질 컨텐츠 개수
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const gotoWrite = () => {
    console.log('hello');
    navigate('/create-post');
  };

  const Layout = styled.div`
    height: 100%;
  `;

  return (
    <Layout>
      <Slider {...settings}>
        {items.map((item) => (
          <ImageContainer key={item.id} imageUrl={item.url}>
            <TitleContainer>
              세상의 <Highlight>다양한</Highlight> 곳을
              <br /> 세상의 <Highlight>다양한</Highlight> 사람들과{' '}
              <Highlight>함께</Highlight>할 수 있도록
            </TitleContainer>

            <TextContainer>
              새로운 사람과의 만남은 여행의 매력 중 하나입니다. <br />
              개방적이고 호기심 가득한 마음으로 다양한 사람들과 소통하고
              동행해보세요.
            </TextContainer>
            <WriteLayout>
              <WriteButton onClick={() => gotoWrite()}>동행 찾기</WriteButton>
            </WriteLayout>
          </ImageContainer>
        ))}
      </Slider>
      <Content />
    </Layout>
  );
};

export default Main;
