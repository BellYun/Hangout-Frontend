import {
  BASE_URL,
  getCommentData,
  getUserData,
  putCommnetData,
  sendCommentData,
} from '@/api/api';
import { commentType } from '@/types/post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import cookie from 'react-cookies';

export const CommentDatas = () => {
  const [isFix, setIsFix] = useState<any>(false);
  const [userData, setUserData] = useState<any>([
    {
      id: '',
      email: '',
      nickname: '',
      description: '',
      imageUrls: [],
      gender: '',
      age: '',
      role: '',
    },
  ]);
  const [commentData, setCommentData] = useState<commentType[] | undefined>([
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
  const [target, setTarget] = useState<any | undefined>('');

  const { postId } = useParams();

  useEffect(() => {
    async function CommentListData(): Promise<void> {
      try {
        const response = await getCommentData(postId);
        console.log(response);
        const responseData = response.data.data;
        if (responseData) {
          for (let i = 0; i < responseData.length; i += 1) {
            responseData[i].isSelect = false;
          }
        }
        console.log(responseData);
        setCommentData(responseData);
      } catch (error) {
        console.log(error);
      }
    }
    MyData();
    CommentListData();
  }, [postId]);

  const [ChildrenComment, setChildrenComment] = useState<any | undefined>();

  const setIsSelect = (index: number) => {
    console.log('Start setIsSelect');
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
    console.log(index + '번째 댓글');
  };

  const setCommentIsSelect = (index: number) => {
    setIsFix(true);
    console.log('Start setCommentIsSelect');
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
      const response = await sendCommentData(userData.id, postId, '', target);
      console.log(response);
      alert('작성되었습니다');
    } catch (error) {
      console.log(error);
      alert(error);
    }
    location.reload();
  };

  const sendChildcomment = async (index: number) => {
    if (isFix === false) {
      try {
        const response = await sendCommentData(
          userData.id,
          postId,
          commentData[index].id,
          ChildrenComment,
        );
        console.log(response);
        alert('작성되었습니다!');
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await putCommnetData(
          commentData[index].id,
          ChildrenComment,
        );
        console.log(response);
        alert('수정되었습니다!');
      } catch (error) {
        console.log(error);
      }
    }
    location.reload();
  };

  const onSearch = (e: any) => {
    setTarget(e.target.value);
    console.log(target);
  };

  const onChildcomment = (e: any) => {
    setChildrenComment(e.target.value);
    console.log(e.target.value);
  };

  const Deletecomment = async (index: any) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/comment/${commentData[index].id}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.load('accessToken')}`,
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      console.log(index);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    location.reload();
  };

  async function MyData(): Promise<void> {
    try {
      const response = await getUserData();
      const responseData = response.data.data;
      console.log(responseData);
      setUserData(responseData);
    } catch (error) {
      console.log(error);
    }

    const ClickComment = (index: any) => {
      setIsFix(false);
      setIsSelect(index);
    };

    const ClickChildrenComment = (index: any) => {
      setIsFix(false);
      setCommentIsSelect(index);
    };
  }

  const ClickChildrenComment = (index: any) => {
    setIsFix(false);
    setCommentIsSelect(index);
  };

  return (
    <Container2>
      <CommentLayout>
        <CommentInput onChange={onSearch} value={target}></CommentInput>
        <Button onClick={sendComment}>게시</Button>
      </CommentLayout>
      {/* 일반적인 댓글 작성 */}

      <div>
        {commentData?.map((datas: any, index: any) => (
          <div>
            <Comment>
              <CommentInfo>
                <CommentInfo2>
                  <CommentWriter>{datas.nickname}</CommentWriter>
                  <CreateTime>
                    {datas.createdAt.slice(0, 10)}{' '}
                    {datas.createdAt.slice(11, 19)}{' '}
                  </CreateTime>
                </CommentInfo2>
                {datas.nickname === userData.nickname ? (
                  <div
                    style={{
                      display: 'flex',
                      width: '90%',
                      justifyContent: 'right',
                    }}
                  >
                    <CommentButton onClick={() => setCommentIsSelect(index)}>
                      수정
                    </CommentButton>
                    <CommentButton onClick={() => Deletecomment(index)}>
                      삭제
                    </CommentButton>
                  </div>
                ) : (
                  ''
                )}
              </CommentInfo>
              <CommentContent>
                <Text>{datas.content}</Text>
                {/* <CommentButton2 onClick={() => ClickComment(index)}> */}
                <CommentButton2>답글</CommentButton2>
              </CommentContent>
              {datas.isSelect === false ? (
                ''
              ) : (
                <CommentLayout>
                  <CommentInput2
                    onChange={onChildcomment}
                    value={ChildrenComment}
                  />
                  <Button onClick={() => sendChildcomment(index)}>게시</Button>
                </CommentLayout>
              )}
              {/* 답글 코멘트  수정과 삭제를 다르게 관리*/}
            </Comment>
            <div>
              {datas.children?.map((comment: any, index: any) => (
                <ChildrenComments>
                  <CommentInfo>
                    <CommentInfo2>
                      <CommentWriter>{datas.nickname}</CommentWriter>
                      <CreateTime2>
                        {datas.createdAt.slice(0, 10)}{' '}
                        {datas.createdAt.slice(11, 19)}{' '}
                      </CreateTime2>
                    </CommentInfo2>
                    {comment.nickname === userData.nickname ? (
                      <div
                        style={{
                          display: 'flex',
                          width: '90%',
                          justifyContent: 'right',
                        }}
                      >
                        <Text onClick={() => setCommentIsSelect(datas.index)}>
                          수정
                        </Text>
                        <Text onClick={() => Deletecomment(index)}>삭제</Text>
                      </div>
                    ) : (
                      ''
                    )}
                  </CommentInfo>
                  <CommentContent>
                    <Text>{comment.content}</Text>
                  </CommentContent>
                </ChildrenComments>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container2>
  );
};

const CommentLayout = styled.div`
  margin: 0px;
  height: 90px;
`;

const Comment = styled.div`
  width: 49.5rem;
  border-radius: 1rem;
  border: 1px solid #f2f2f2;
  margin-top: 1rem;
  padding: 15px;
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
const CommentInfo2 = styled.div`
  overflow: visible;
  display: flex;
  flex-direction: row;
  width: 30rem;
  margin-top: 0.5rem;
  font-size: 1.15rem;
`;

const CommentWriter = styled.div`
  overflow: visible;
  display: flex;
  flex-direction: row;
  width: 80rem;
  margin-top: 0.5rem;
  font-size: 1.15rem;
  color: #6baef6;
`;

const CreateTime = styled.div`
  overflow: visible;
  display: flex;
  justify-content: right;
  width: 47rem;
  font-size: 1rem;
`;

const CreateTime2 = styled.div`
  overflow: visible;
  display: flex;
  justify-content: right;
  width: 50rem;
  font-size: 1rem;
`;

const CommentInfo = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
  width: 90%;
`;

const CommentContent = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-between;
`;

const ChildrenComments = styled.div`
  width: 47rem;
  border-radius: 1rem;
  border: 1px solid #f2f2f2;
  margin-top: 0.5rem;
  margin-left: 2.5rem;
  padding: 8px;
  background-color: #f7f7f7;
  font-family: 'Pretendard-Regular';
`;

const Bg = styled.div`
  background-color: #eaf0f8;
  height: 100%;
  padding-bottom: 2rem;
`;

// const TitleImg = styled.div`
//   background-image: url(${titleImg});
//   height: 22.5rem;
//   width: 70rem;
//   text-align: center;
//   background-position: center;
//   margin: 0 auto;
//   margin-top: 4.5rem;
//   border-radius: 2rem;
// `;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
`;

const CommentInput = styled.input`
  margin-top: 2rem;
  height: 3rem;
  width: 39rem;
  border: 0.1px solid #cdcaca;
  border-radius: 0.7rem;
  padding: 1rem;
`;

const CommentInput2 = styled.input`
  margin-top: 2rem;
  height: 3rem;
  width: 43rem;
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
