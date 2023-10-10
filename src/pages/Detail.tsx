import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import titleImg from '../assets/image/image1.png';
import user from '../assets/image/user.png';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import axios from 'axios';
import { commentType } from '@/types/post';
import cookie from 'react-cookies';
import Post from '@/components/board/post';
// import { getCommentList } from '@/api/api';

function Detail() {
  const locations = useLocation();
  const queryParems = new URLSearchParams(locations.search);
  const searchTerm = queryParems.get('q');

  const [PostData, setPostData] = useState<any[] | any>([]);
  const [postnum, setPostnum] = useState<string | undefined>('');
  const [commentData, setCommentData] = useState<commentType[]>([
    {
      children: [],
      content: '',
      createdAt: '',
      id: 0,
      isSelect: false,
      likeCount: 0,
      nickname: '',
    },
  ]);
  const [userId, setUserId] = useState<any | undefined>('');
  const [userData, setUserData] = useState<any | undefined>('');
  const [comments, setComments] = useState<any | undefined>('');
  const [myData, setMyData] = useState<any | undefined>('');
  const [ChildrenComment, setChildrenComment] = useState<any | undefined>();

  const [repo, setRepo] = useState('auto-test');
  const [path, setPath] = useState('READ.md');

  // const {isLoading,isError,data,error} =useQuery('comment',getCommentList)


  const setIsSelect = (index: number) => {
    setChildrenComment('');
    setCommentData((prevData) => {
      const newData = [...prevData];
      if (newData[index].isSelect === false) {
        for (let i = 0; i < newData.length; i++) {
          newData[i] = {
            ...newData[i],
            isSelect: false,
          };
        }
        newData[index] = {
          ...newData[index],
          isSelect: !newData[index].isSelect,
        };
        return newData;
      } else {
        newData[index] = {
          ...newData[index],
          isSelect: !newData[index].isSelect,
        };
        return newData;
      }
    });
    console.log(commentData);
  };

  const setCommentIsSelect = (index: number) => {
    setChildrenComment('');
    setCommentData((prevData) => {
      const newData = [...prevData]; // 기존 데이터 가져오기

      if (newData[index].isSelect === false) {
        // 선택이 안되어있는 경우
        for (let i = 0; i < newData.length; i++) {
          newData[i] = {
            ...newData[i],
            isSelect: false,
          };
        }
        newData[index] = {
          ...newData[index],
          isSelect: !newData[index].isSelect,
        };
        return newData;
      } else {
        //다른곳이 선택이 되어있는 경우
        newData[index] = {
          ...newData[index],
          isSelect: !newData[index].isSelect,
        };
        return newData;
      }
    });
    setChildrenComment(commentData[index].content);
    console.log(commentData);
  };



  const sendComment = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/comment',
        {
          userId: userData.id,
          postId: searchTerm,
          parentId: '',
          content: comments,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.load('accessTokens')}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log(response);
      alert('작성되었습니다');
    } catch (error) {
      console.log(error);
    }
    location.reload();
  };

  const sendChildcomment = async (parentId: number) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/comment',
        {
          userId: userData.id,
          postId: searchTerm,
          parentId: parentId,
          content: ChildrenComment,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.load('accessTokens')}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log(response);
      alert('작성되었습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (e: any) => {
    setComments(e.target.value);
    console.log(comments);
  };

  const onChildcomment = (e: any) => {
    setChildrenComment(e.target.value);
  };

  const Deletecomment = async (index: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/comment/${index}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('accessTokens')}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log(response);
      alert('삭제되었습니다');
    } catch (error) {
      console.log(error);
    }
    location.reload();
  };

  
  useEffect(() => {
    async function UserData(): Promise<void> {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/${data.userId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie.load('accessTokens')}`,
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
        console.log(response);
        const responseData = response.data.data;
        console.log(responseData);
        setUserData(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    UserData();
  }, []);

  return (
    <Bg>
      <TitleImg></TitleImg>
      <Post/>
    </Bg>
  );
}

export default Detail;

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

const TitleImg = styled.div`
  background-image: url(${titleImg});
  height: 22.5rem;
  width: 70rem;
  text-align: center;
  background-position: center;
  margin: 0 auto;
  margin-top: 4.5rem;
  border-radius: 2rem;
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
