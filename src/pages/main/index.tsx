import React, { Suspense, lazy, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Content from './Contents';
import trip1 from '../../assets/image/trip1.webp';
import trip2 from '../../assets/image/trip2.webp';
import trip3 from '../../assets/image/trip3.webp';
import '../../assets/font/font.css';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = lazy(() => import('./HeroCarousel'));
const CAROUSEL_MOUNT_DELAY_MS = 1200;

interface HeroItem {
  id: number;
  url: string;
  alt: string;
}

const items = [
  { id: 1, url: trip1, alt: '여행 메인 이미지 1' },
  { id: 2, url: trip2, alt: '여행 메인 이미지 2' },
  { id: 3, url: trip3, alt: '여행 메인 이미지 3' },
];

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 33.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4));
`;

const TitleContainer = styled.div`
  position: relative;
  z-index: 1;
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
  position: relative;
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
  position: relative;
  z-index: 1;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const TextContainer = styled.div`
  position: relative;
  z-index: 1;
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

const Layout = styled.div`
  height: 100%;
`;

interface HeroSlideProps {
  item: HeroItem;
  onWriteClick: () => void;
  loading: 'eager' | 'lazy';
}

const HeroSlide = ({ item, onWriteClick, loading }: HeroSlideProps) => {
  return (
    <ImageContainer>
      <HeroImage
        src={item.url}
        alt={item.alt}
        width={1920}
        height={1280}
        loading={loading}
        decoding="async"
      />
      <HeroOverlay />
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
        <WriteButton onClick={onWriteClick}>동행 찾기</WriteButton>
      </WriteLayout>
    </ImageContainer>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);

  const gotoWrite = () => {
    console.log('hello');
    navigate('/create-post');
  };

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setShowCarousel(true);
    }, CAROUSEL_MOUNT_DELAY_MS);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <Layout>
      {!showCarousel ? (
        <HeroSlide item={items[0]} onWriteClick={gotoWrite} loading="eager" />
      ) : (
        <Suspense
          fallback={
            <HeroSlide item={items[0]} onWriteClick={gotoWrite} loading="eager" />
          }
        >
          <HeroCarousel>
            {items.map((item) => (
              <HeroSlide
                key={item.id}
                item={item}
                onWriteClick={gotoWrite}
                loading={item.id === 1 ? 'eager' : 'lazy'}
              />
            ))}
          </HeroCarousel>
        </Suspense>
      )}
      <Content />
    </Layout>
  );
};

export default Main;
