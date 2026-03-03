import React, { Suspense, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type SlickModule = typeof import('react-slick');
const Content = React.lazy(() => import('./Contents'));

interface HeroItem {
  id: number;
  url: string;
  alt: string;
  mobileSrcSet: string;
  desktopSrcSet: string;
  sizes: string;
}

const items = [
  {
    id: 1,
    url: '/hero/trip1.webp',
    alt: '여행 메인 이미지 1',
    mobileSrcSet: '/hero/trip1-480-mobile.webp 480w, /hero/trip1-640-mobile.webp 640w',
    desktopSrcSet: '/hero/trip1-1280.webp 1280w, /hero/trip1.webp 1920w',
    sizes: '100vw',
  },
  {
    id: 2,
    url: '/hero/trip2.webp',
    alt: '여행 메인 이미지 2',
    mobileSrcSet: '/hero/trip2-480-mobile.webp 480w, /hero/trip2-640-mobile.webp 640w',
    desktopSrcSet: '/hero/trip2-1280.webp 1280w, /hero/trip2.webp 1920w',
    sizes: '100vw',
  },
  {
    id: 3,
    url: '/hero/trip3.webp',
    alt: '여행 메인 이미지 3',
    mobileSrcSet: '/hero/trip3-480-mobile.webp 480w, /hero/trip3-640-mobile.webp 640w',
    desktopSrcSet: '/hero/trip3-1280.webp 1280w, /hero/trip3.webp 1920w',
    sizes: '100vw',
  },
];

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 33.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
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
  font-family: inherit;
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
  font-family: inherit;
  overflow: visible;
`;

const Layout = styled.div`
  height: 100%;
`;

interface HeroSlideProps {
  item: HeroItem;
  onWriteClick: () => void;
  loading: 'eager' | 'lazy';
  isLcpImage: boolean;
}

interface HeroImageProps {
  item: HeroItem;
  loading: 'eager' | 'lazy';
  isLcpImage: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const HeroImage = ({ item, loading, isLcpImage, onLoad, onError }: HeroImageProps) => {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={item.mobileSrcSet} sizes={item.sizes} />
      <source media="(min-width: 768px)" srcSet={item.desktopSrcSet} sizes={item.sizes} />
      <img
        className="hero-image"
        src={item.url}
        srcSet={item.desktopSrcSet}
        sizes={item.sizes}
        alt={item.alt}
        width={1920}
        height={1280}
        loading={loading}
        fetchPriority={isLcpImage ? 'high' : 'auto'}
        decoding={isLcpImage ? 'sync' : 'async'}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
  );
};

const HeroSlide = ({ item, onWriteClick, loading, isLcpImage }: HeroSlideProps) => {
  return (
    <ImageContainer>
      <HeroImage item={item} loading={loading} isLcpImage={isLcpImage} />
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
  const [SlickSlider, setSlickSlider] = useState<SlickModule['default'] | null>(null);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    if (!isHeroLoaded) {
      return;
    }

    let isCancelled = false;

    const loadSlick = async () => {
      const [{ default: Slick }] = await Promise.all([
        import('react-slick'),
        import('slick-carousel/slick/slick.css'),
        import('slick-carousel/slick/slick-theme.css'),
      ]);

      if (!isCancelled) {
        setSlickSlider(() => Slick);
      }
    };

    void loadSlick();

    return () => {
      isCancelled = true;
    };
  }, [isHeroLoaded]);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      fade: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
    }),
    [],
  );

  const gotoWrite = () => {
    navigate('/create-post');
  };

  if (!isHeroLoaded || !SlickSlider) {
    return (
      <Layout>
        <ImageContainer>
          <HeroImage
            item={items[0]}
            loading="eager"
            isLcpImage={true}
            onLoad={() => setIsHeroLoaded(true)}
            onError={() => setIsHeroLoaded(true)}
          />
        </ImageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <SlickSlider {...settings}>
        {items.map((item) => (
          <HeroSlide
            key={item.id}
            item={item}
            onWriteClick={gotoWrite}
            loading="lazy"
            isLcpImage={false}
          />
        ))}
      </SlickSlider>
      <Suspense fallback={null}>
        <Content />
      </Suspense>
    </Layout>
  );
};

export default Main;
