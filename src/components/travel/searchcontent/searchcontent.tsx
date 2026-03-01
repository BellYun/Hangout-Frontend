import React, { useEffect, useState } from 'react';
import './searchcontent.scss';
import DetailSearch from '../detailsearch/detailsearch';
//import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import { useLocation, useParams } from 'react-router-dom';
import InfinitePostList from '@/components/main/InfinitePostList';

const SearchContent = () => {
  const { SearchType } = useParams();
  const { Keyword } = useParams();
  const [url, setUrl] = useState('all/0');

  return (
    <div className="searchContentBackground">
      <InfinitePostList
        queryString={url}
        searchType={SearchType}
        searchKeyword={Keyword}
      />
    </div>
  );
};

export default SearchContent;
