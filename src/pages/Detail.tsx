import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import user from '../assets/image/user.webp';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import axios from 'axios';
import { commentType } from '@/types/post';
import cookie from 'react-cookies';
import Post from '@/components/board/Post';
import { CommentDatas } from '@/components/board/CommentDatas';
// import { getCommentList } from '@/api/api';

function Detail() {
  return (
    <Bg>
      <Post />
      <CommentDatas />
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
  font-family: 'Pretendard-Regular';
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
  font-family: 'Pretendard-Regular';
`;

const Bg = styled.div`
  height: 100%;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
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
