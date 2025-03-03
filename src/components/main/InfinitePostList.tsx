import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import likeIcon from '@mui/icons-material/Favorite';
import Comment from '@/assets/image/detailcomment.webp';
import place from '@/assets/image/placeholder.webp';
import { useNavigate } from 'react-router-dom';
import { PostType } from '@/types/post';
import axios from 'axios';
import gyeongju from '@/assets/image/trip1.webp';
import user from '@/assets/image/user.webp';
import cookie from 'react-cookies';
import {
  getLikeData,
  getPostData,
  getPostListData,
  postLikeData,
} from '@/api/api';

const InfinitePostList = (queryString: any) => {
  const url2 = 0;
  const Type = queryString.searchType.toString();
  const keyword = queryString.searchKeyword.toString();
  const navigate = useNavigate();
  const [likedata, setLikeData] = useState<PostType[] | undefined>();
  const [listData, setListData] = useState<PostType[]>([]);
  const [liked, setLiked] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    console.log('hello');
    setPage((prev) => prev + 1);
  };

  const PostListData = async (page: number) => {
    console.log(Type);
    console.log(keyword);
    try {
      const response = await getPostListData(page, Type, keyword);
      const responseData: PostType[] = response.data.data;
      if (listData !== undefined) {
        setListData((prev) => [...prev, ...responseData]);
      } else {
        setListData(responseData);
      }
      console.log(responseData);
      setLoading(true);
      const postDataIds = responseData.map((item) => item.id);
    } catch (error) {
      console.log(error);
    }
  }; // 게시물 조회를 무한으로 불러오는 API

  useEffect(() => {
    PostListData(page);
  }, [Type, keyword, page]);

  const pageEnd = useRef();

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 },
      );
      //옵저버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  useEffect(() => {
    const LikeListData = async () => {
      try {
        const response = await getLikeData(0);
        const responseData: PostType[] = response.data.data;

        setLikeData(responseData);

        const likeDataIds = responseData.map((item) => item.id);
        setLiked(likeDataIds);
      } catch (error) {
        console.log(error);
      }
    };
    LikeListData();
  }, []);

  const setLike = async (postId: number) => {
    //로그인 안된 경우 코드 수정
    try {
      postLikeData(postId);
      console.log('좋아요 실행 및 취소');
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  const goto = (num: number): void => {
    navigate(`/detail/${num}`);
  };

  return (
    <PreviewBackground>
      <ContentLayout>
        <GridLayout>
          {listData?.map((datas: any, index: any) => (
            <Content key={index}>
              <TopWarp>
                <ProfileWrap>
                  <Profile />
                  <InfoWrap>
                    <Nickname>{datas.nickname}</Nickname>
                    {/* 닉네임으로 변경 */}
                    <Gender>
                      {' '}
                      {datas.travelAge}대 | {datas.travelGender}
                    </Gender>
                  </InfoWrap>
                </ProfileWrap>
                <DateWrap>
                  <DateTitle>여행 기간</DateTitle>
                  <Date>
                    {datas.travelDateStart.slice(5, 10).replace(/-/g, '/')} -{' '}
                    {datas.travelDateEnd.slice(5, 10).replace(/-/g, '/')}
                  </Date>
                </DateWrap>
              </TopWarp>
              <MiddleWrap>
                <HeartLayout>
                  <LikeIcon
                    style={{
                      marginLeft: '.7rem',
                      marginTop: '.7rem',
                      justifyContent: 'right',
                      zIndex: '999',
                      color: liked.includes(datas.id) ? '#f90808' : '#ffffff',
                    }}
                    onClick={() => {
                      if (liked.includes(datas.id)) {
                        setLiked(liked.filter((id) => id !== datas.id));
                        setLike(datas.id);
                      } else {
                        setLiked([...liked, datas.id]);
                        setLike(datas.id);
                      }
                    }}
                  />
                </HeartLayout>
                <ImgWrap>
                  <Img
                    style={{
                      backgroundImage: !datas.imageUrls[0]
                        ? gyeongju
                        : `url(${datas.imageUrls})`,
                    }}
                    onClick={() => goto(datas.id)}
                  >
                    <ImgInfo></ImgInfo>
                  </Img>
                </ImgWrap>
              </MiddleWrap>
              {/* <DestinationText>{datas.travelAt}</DestinationText> */}
              {/* <Detail>
                78
                <img src={View} alt="View" />
                7
                <img src={Comment} alt="Comment" />
                14
                <img src={Heart} alt="Heart" />
              </Detail> */}
              <PostInfo>
                <DestinationWrap>
                  <PlaceLayout>
                    <img src={place} alt="Place" />
                  </PlaceLayout>
                  <DestinationText>
                    {datas.travelState} {datas.travelCity}
                  </DestinationText>
                </DestinationWrap>
                <Title onClick={() => goto(datas.id)}>{datas.title}</Title>
                <Member>{datas.travelMember}인 동행을 원해요!</Member>
              </PostInfo>
            </Content>
          ))}
        </GridLayout>
      </ContentLayout>
      <div ref={pageEnd} />
    </PreviewBackground>
  );
};

export default InfinitePostList;

const PreviewBackground = styled.div`
  width: 100%;
  flex-direction: column;
  align-content: center;
  display: flex;
  font-family: 'Pretendard-Regular';
`;

const ContentLayout = styled.div`
  width: 95rem;
  margin-top: 3rem;
  background-color: white;
  align-self: center;
  overflow: visible;
`;

const GridLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 1rem;
  overflow: visible;
  height: 100%;
  /* background-color: red; */
  @media (max-width: 1400px) {
    margin-left: 12rem;
    margin-top: -5rem;
    transform: scale(0.9);
    width: 80%;
  }

  @media (max-width: 950px) {
    margin-left: 24rem;
    margin-top: -5rem;
    transform: scale(0.9);
    width: 50%;
  }

  @media (max-width: 600px) {
    margin-left: 35.5rem;
    margin-top: 3rem;
    width: 30%;
  }
`;

const Content = styled.div`
  width: 21.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f6f6;
  padding: 5px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
  margin-left: 1rem;
  border-radius: 1rem;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.11);
  z-index: 998;
  height: 28rem;
  transition: transform 0.5s;

  &:hover {
    position: center;
    transform: scale(1.05); /* 이미지 확대 */
  }

  @media (max-width: 1400px) {
    transform: scale(0.9);

    &:hover {
      position: center;
      transform: scale(0.95); /* 이미지 확대 */
    }
  }
`;
const MiddleWrap = styled.div`
  width: 120%;
  height: 15rem;
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-left: -1rem;
  overflow: hidden;
`;

const DestinationWrap = styled.div`
  width: 100%;
  height: 0.5rem;
  border: none;
  display: flex;
  margin-left: 3.5rem;
  margin-top: -0.5rem;
  overflow: visible;
  justify-content: center;
`;

const DestinationText = styled.div`
  height: 1rem;
  padding: 0.2rem;
  width: 12rem;
  display: flex;
  text-align: center;
  border-radius: 0.6rem;
  font-weight: 750;
  color: #0792e3;
  z-index: 99;
  font-size: 1.3rem;
  overflow: visible;
`;
const ImgWrap = styled.div`
  width: 24rem;
  height: 16rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: -3rem;
`;
const Img = styled.button`
  display: flex;
  margin-left: -1rem;
  opacity: 0.9;
  width: 117%;
  overflow: hidden;
  margin-top: -3rem;
  height: 20rem;
  border-radius: 1rem;
  background-size: cover;
  background-image: url(${gyeongju});
  background-repeat: no-repeat;
  transition: transform 0.5s;

  &:hover {
    position: center;
    opacity: 0.9;
    transform: scale(1.1); /* 이미지 확대 */
  }
`;

const ImgInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 8px;
  justify-content: space-between;
`;

const HeartLayout = styled.button`
  justify-content: right;
  display: flex;
  width: 93%;
`;

const PlaceLayout = styled.button`
  justify-content: right;
  display: flex;
  border: none;
  background-color: #f5f6f6;
  width: 4.5%;
  margin-top: 0.2rem;
`;

const TopWarp = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileWrap = styled.div`
  display: flex;
  height: 4.5rem;
  width: 15rem;
  margin-top: -0.3rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const InfoWrap = styled.div`
  display: block;
  height: 4.5rem;
  width: 15rem;
  overflow: hidden;
`;

const Profile = styled.div`
  background-image: url(${user});
  position: relative;
  display: flex;
  height: 3.5rem;
  width: 7rem;
  border-radius: 3rem;
  background-size: 3.5rem 3.5rem;
  background-repeat: no-repeat;
  z-index: 999;
  margin-top: 0.7rem;
  margin-left: 0.4rem;
`;

const LikeIcon = styled(likeIcon)`
  position: absolute;
`;

const Nickname = styled.div`
  position: relative;
  display: block;
  height: 1.7rem;
  width: 10rem;
  font-weight: 700;
  margin-top: 1.25rem;
`;

const Gender = styled.div`
  display: block;
  height: 2rem;
  width: 10rem;
  color: #1aa5f5;
`;

const PostInfo = styled.div`
  height: 120px;
  padding: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.button`
  font-size: 1.15rem;
  font-weight: 1000;
  height: 20px;
  overflow: visible;
  margin-top: 2.5rem;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #f5f6f6;
`;
const DateWrap = styled.div`
  display: block;
  height: 4rem;
  width: 9rem;
  margin-top: 0.15rem;
`;
const DateTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.7rem;
  overflow: hidden;
`;

const Date = styled.div`
  font-size: 16px;
  overflow: hidden;
  margin-top: 0.5rem;
  color: #1aa5f5;
`;

const Member = styled.div`
  font-size: 16px;
  overflow: visible;
  margin-top: 1.4rem;
  color: #1aa5f5;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;
