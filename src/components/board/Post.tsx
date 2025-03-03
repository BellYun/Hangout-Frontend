import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import cookie from 'react-cookies';
import user from '../../assets/image/user.webp';
import { useQuery } from '@tanstack/react-query';
import { getPostData, getPostListData, getUserData } from '@/api/api';
import { useParams } from 'react-router-dom';
import Maps from '@/pages/post/naverMap';
import { response } from 'msw';

export interface IPostData {
  id?: number | undefined;
  imageUrls?: string;
  title?: string;
  userId?: string;
  context?: string;
  tags?: string[];
  travelGender?: string;
  travelState?: string | undefined;
  travelCity?: string | undefined;
  travelAge?: string;
  travelDateStart?: Date;
  travelDateEnd?: Date;
  travelMember?: number;
  content?: string;
  createdAt?: string;
  viewCount?: string;
}

export interface IUserData {
  id: number;
  email: string;
  nickname: string;
  description: null;
  imageUrls: any[];
  gender: string;
  age: number;
  role: string;
}

const Post = () => {
  const [userId, setUserId] = useState<any | undefined>('');
  const [myData, setMyData] = useState<any | undefined>('');
  const [PostData, setPostData] = useState<any>('');

  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    const PostListData = async () => {
      try {
        const response = await getPostData(postId);
        console.log(response.data.data);
        setPostData(response.data.data);
      } catch (error) {
        console.log(error);
      }
      console.log(`엥`);
    };
    PostListData();
  }, []);

  return (
    <PostBg>
      <MapContainer>
        <Maps postData={PostData} />
      </MapContainer>

      <Container>
        <LeftContainer>
          <Title>{PostData?.title}</Title>
          <DestinationContainer>
            <Destination>여행지역</Destination>
            <DestinationValue>
              {PostData?.travelState} {PostData?.travelCity}
            </DestinationValue>
          </DestinationContainer>
          <PeopleContainer>
            <People>모집인원</People>
            <PeopleValue>{PostData?.travelMember}명</PeopleValue>
          </PeopleContainer>
          <DateContainer>
            <Date>여행날짜</Date>
            <Dates>
              {PostData?.travelDateStart} ~ {PostData?.travelDateEnd}
            </Dates>
          </DateContainer>
          <ContentsContainer>
            <Content>
              <div
                dangerouslySetInnerHTML={{ __html: PostData?.context }}
              ></div>
            </Content>
          </ContentsContainer>
          {/* <HashtagContainer>#맛집투어ㅤ#인생사진</HashtagContainer> */}
          <PostContainer>
            {/* <PostDate>
              {PostData?.createdAt.slice(0, 10)}{' '}
              {PostData?.createdAt.slice(11, 19)}
            </PostDate> */}
            <PostView>조회수 {PostData?.viewCount}</PostView>
          </PostContainer>
        </LeftContainer>
        <RightContainer>
          <ProfileImg>
            <ProfileName>{PostData?.nickname}</ProfileName>
            <ProfileInfo>
              {PostData?.age}대 {PostData?.gender}
            </ProfileInfo>
            <ProfileIntroduce>{PostData?.description}</ProfileIntroduce>
          </ProfileImg>
        </RightContainer>
      </Container>
    </PostBg>
  );
};

export default Post;

const PostBg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CommentLayout = styled.div`
  margin: 0px;
  height: 90px;
`;

const Comment = styled.div`
  width: 46rem;
  border-radius: 1rem;
  border: 1px solid #f2f2f2;
  margin-top: 1rem;
  padding: 8px;
  background-color: #ffffff;
  font-family: 'NanumSquareNeo-Variable';
`;

const CommentButton = styled.div`
  padding: 8px;
  border-radius: 0.7rem;
  cursor: pointer;
  color: #6b9af9;
  margin-left: 1rem;
  &:hover {
    color: #aac3f5;
    cursor: pointer;
  }
`;

const CommentButton2 = styled.div`
  padding: 8px;
  border-radius: 0.7rem;
  background-color: #6baef6;
  color: white;

  &:hover {
    background-color: #9bc8f9;
    color: #f9f7f7;
    cursor: pointer;
  }
`;

const Text = styled.div`
  padding: 8px;

  margin-left: 0.55rem;
`;

const CommentWriter = styled.div`
  overflow: visible;
  display: flex;
  flex-direction: row;
  width: 10rem;
  margin-top: 0.5rem;
  font-size: 1.15rem;
`;

const CommentInfo = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
`;

const CommentContent = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;
`;

const ChildrenComments = styled.div`
  width: 46rem;
  border-radius: 1rem;
  border: 1px solid #f2f2f2;
  margin-top: 0.1rem;
  padding: 8px;
  background-color: #f7f7f7;
  font-family: 'NanumSquareNeo-Variable';
`;

const Bg = styled.div`
  background-color: #eaf0f8;
  height: 100%;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const MapContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;
const LeftContainer = styled.div`
  width: 45%;
`;
const Title = styled.div`
  font-size: 1.4rem;
  height: 3rem;
  width: 40rem;
  overflow: visible;
  margin-top: 2rem;

  color: #73a1ec;
  border-bottom: 2px solid #afbdd3;
  font-weight: 750;
`;
const DestinationContainer = styled.div`
  width: 50rem;

  display: flex;
`;
const Destination = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 5rem;
  overflow: visible;
  margin-top: 2rem;

  color: #9f9e9e;
  font-weight: 600;
  display: flex;
`;
const DestinationValue = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 10rem;
  overflow: visible;
  margin-top: 2rem;
  margin-left: 2rem;
  color: #73a1ec;
  font-weight: 600;
  display: flex;
`;

const PeopleContainer = styled.div`
  width: 50rem;
  display: flex;
`;
const People = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 5rem;
  overflow: visible;

  color: #9f9e9e;
  font-weight: 600;
`;
const PeopleValue = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 10rem;
  overflow: visible;
  margin-left: 2rem;
  color: #73a1ec;
  font-weight: 600;
  display: flex;
`;
const DateContainer = styled.div`
  width: 50rem;
  display: flex;
`;
const Date = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 5rem;
  overflow: visible;

  color: #9f9e9e;
  font-weight: 600;
`;
const Dates = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 15rem;
  overflow: visible;
  margin-left: 2rem;
  color: #73a1ec;
  font-weight: 600;
  display: flex;
`;
const ContentsContainer = styled.div`
  width: 44rem;
  height: 13rem;
  display: flex;
  line-height: 5rem;
`;
const Content = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  min-width: 38rem;
  overflow: visible;
  margin-top: 3rem;
  margin-left: 1rem;
  color: #3c3a3a;
  font-weight: 600;
  line-height: 1.6rem;
`;
const HashtagContainer = styled.div`
  width: 43.5rem;
  height: 2rem;
  font-weight: 600;
  line-height: 2rem;
  display: flex;
  overflow: visible;
  color: #73a1ec;
`;
const PostContainer = styled.div`
  width: 50rem;
  display: flex;
`;
const PostDate = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 13rem;
  overflow: visible;
  color: #9f9e9e;
  font-weight: 600;
`;
const PostView = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 5rem;
  overflow: visible;
  margin-left: 2rem;
  color: #9f9e9e;
  font-weight: 600;
  display: flex;
`;
const PostComment = styled.div`
  font-size: 1.1rem;
  height: 2rem;
  width: 4rem;
  overflow: visible;
  margin-left: rem;
  color: #9f9e9e;
  font-weight: 600;
  display: flex;
`;

const RightContainer = styled.div`
  width: 30rem;
  justify-content: center;

  display: flex;
`;

const ProfileName = styled.div`
  font-size: 1.3rem;
  height: 1rem;
  width: 20rem;
  overflow: visible;
  margin-top: 7.5rem;
  margin-left: 10rem;
  color: black;
  font-weight: 750;
  display: flex;
`;
const ProfileInfo = styled.div`
  font-size: 0.9rem;
  height: 1rem;
  width: 20rem;
  overflow: visible;
  margin-top: 1.5rem;
  margin-left: 10rem;
  color: gray;
  font-weight: 600;
  display: flex;
`;
const ProfileIntroduce = styled.div`
  font-size: 0.9rem;
  height: 1rem;
  width: 20rem;
  overflow: visible;
  margin-top: 0.5rem;
  margin-left: 10rem;
  color: gray;
  font-weight: 600;
  display: flex;
`;
const Container2 = styled.div`
  width: 70rem;
  margin-left: 12rem;
  display: flex;
  flex-direction: column;
`;

const CommentInput = styled.input`
  margin-top: 2rem;
  height: 3rem;
  width: 40rem;
  border: 0.1px solid #cdcaca;
  border-radius: 0.7rem;
  padding: 1rem;
`;

const Button = styled.button`
  height: 3rem;
  width: 4rem;
  background-color: #8db5f6;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  margin-top: 2rem;
  margin-left: 0.5rem;
  &:hover {
    background-color: skyblue;
    color: white;
    cursor: pointer;
  }
`;

const ProfileImg = styled.div`
  background: url(${user});
  width: 20rem;
  height: 15rem;
  background-size: 8rem 8rem;
  background-repeat: no-repeat;

  background-position-y: 6rem;

  display: block;
`;
