import React from 'react';
import SearchContent from '@/components/travel/searchcontent/searchcontent';
import styled from 'styled-components';

const Travel = () => {
  return (
    <SearchBackground>
      <Searchimg />
      <SearchContent />
    </SearchBackground>
  );
};

export default Travel;

const SearchBackground = styled.div`
  width: 100%;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Searchimg = styled.div`
  width: 100%;
  height: 400px;
  background-image: url('/src/assets/image/Background.webp');
  background-position: center center;
`;
