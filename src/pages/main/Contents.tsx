import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import jejuBtn from '../../assets/image/jeju-btn.webp';
import gyeongjuBtn from '../../assets/image/gyeongju-btn.webp';
import seoulBtn from '../../assets/image/seoul-btn.webp';
import busanBtn from '../../assets/image/busan-btn.webp';
import jeonraBtn from '../../assets/image/jeonra-btn.webp';
import allBtn from '../../assets/image/all-btn.webp';
import PostList from '@/components/main/postList';

//TODO:> png webp

interface ContentsImgProps {
  backgroundImg: string;
  marginLeft: string;
}

const Content = () => {
  const [url, setUrl] = useState('all/0');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <Background>
      <Title>인기 여행지</Title>
      <ContentsWrap>
        <ContentsImg
          backgroundImg={jejuBtn}
          marginLeft="-0.1rem"
          onClick={() => handleLocationClick('제주도')}
        >
          <BtnName>제주도</BtnName>
        </ContentsImg>
        <ContentsImg
          backgroundImg={gyeongjuBtn}
          marginLeft="7.5rem"
          onClick={() => handleLocationClick('경주')}
        >
          <BtnName>경주</BtnName>
        </ContentsImg>
        <ContentsImg
          backgroundImg={seoulBtn}
          marginLeft="7.3rem"
          onClick={() => handleLocationClick('서울')}
        >
          <BtnName>서울</BtnName>
        </ContentsImg>
        <ContentsImg
          backgroundImg={busanBtn}
          marginLeft="7.2rem"
          onClick={() => handleLocationClick('부산')}
        >
          <BtnName>부산</BtnName>
        </ContentsImg>
        <ContentsImg
          backgroundImg={jeonraBtn}
          marginLeft="7.2rem"
          onClick={() => handleLocationClick('전라도')}
        >
          <BtnName>전라도</BtnName>
        </ContentsImg>
        <ContentsImg
          backgroundImg={allBtn}
          marginLeft="7.2rem"
          onClick={() => handleLocationClick('')}
        >
          <BtnName>전체보기</BtnName>
        </ContentsImg>
      </ContentsWrap>
      <PostList
        queryString={url}
        searchType={'stateAndCity'}
        searchKeyword={selectedLocation}
      />
    </Background>
  );
};
export default Content;

const Background = styled.div`
  width: 100%;
  height: 150%;
  justify-content: center;
  font-size: 16px;
`;
const Title = styled.div`
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 500;
  font-size: 1.5rem;
  font-family: 'SUITE-Regular';
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: 19rem;
  display: flex;
  justify-content: center;
  font-size: 16px;
  flex-wrap: wrap;
  overflow: visible;
  margin-top: 1rem;
  transition: transform 0.7s;

  @media (max-width: 1400px) {
    margin-left: -2rem;
    overflow: visible;
    transform: scale(0.95);
  }
`;

const ContentsImg = styled.div<ContentsImgProps>`
  margin-left: ${(props) => props.marginLeft};
  opacity: 1;
  width: 7.8rem;
  margin-top: 2rem;
  height: 9rem;
  border-radius: 1rem;
  background-position: center 0;
  background-size: 8rem 6.5rem;
  background-image: ${(props) => `url(${props.backgroundImg})`};
  background-repeat: no-repeat;
  transition: transform 0.5s;
  justify-content: center;
  cursor: pointer;
  overflow: visible;

  &:hover {
    position: center;
    opacity: 0.75;
    transform: scale(1.1); /* 이미지 확대 */
  }

  @media (max-width: 1400px) {
    margin-left: 4rem;
    overflow: visible;
  }
`;

const BtnName = styled.div`
  margin-top: 7.5rem;
  width: 100%;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: #333;
  font-size: 1.2rem;
  font-family: 'SUITE-Regular';
`;
