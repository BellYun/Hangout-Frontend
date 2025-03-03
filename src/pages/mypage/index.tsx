import React, { useEffect, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import user from '@/assets/image/user.webp';
import { useQuery } from '@tanstack/react-query';
import { restFetcher } from '@/queryClient';
import axios from 'axios';
import { textAlign } from '@mui/system';
import { PostType } from '@/types/post';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import likeIcon from '@mui/icons-material/Favorite';
import unlikeIcon from '@mui/icons-material/FavoriteBorder';
import gyeongju from '@/assets/image/trip3.webp';
import place from '@/assets/image/placeholder.webp';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import '@/assets/font/font.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL, getUserData } from '@/api/api';
import ProfileEditModal from '@/components/common/Modal/ProfileEditModal';
//TODO : mypage 기능 누락 수정

// const ProfileEditModal = lazy(() => import('@/components/common/Modal/ProfileEditModal'));

export interface UserType {
  age: number;
  description: string;
  email: string;
  gender: string;
  id: number;
  imageUrls: string[];
  nickname: string;
  role: string;
}

function Profile() {
  const url = 0; // 임시로 0 설정
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<UserType | undefined>();
  const [activeSection, setActiveSection] = useState('mypost');
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [postdata, setPostData] = useState<PostType[] | undefined>();
  const [commentdata, setCommentData] = useState<PostType[] | undefined>();
  const [likedata, setLikeData] = useState<PostType[] | undefined>();
  const [liked, setLiked] = useState([]);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await getUserData();
        const responseData = response.data.data;
        setData(responseData);
        setId(responseData.id);
      } catch (error) {
        alert('로그인이 되어있지 않습니다');
        navigate('/');
      }
    };
    UserData();
  }, []);

  // 프로필 이미지 삭제
  const deleteProfileImg = async () => {
    try {
      const res = await axios({
        method: 'delete',
        url: `${BASE_URL}/user/${data.id}/image`,
        headers: {
          Authorization: `Bearer ${cookie.load('accessToken')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('프로필 이미지가 삭제되었습니다.');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // GET : 내가 작성한 게시물
  useEffect(() => {
    const PostListData = async () => {
      if (activeSection === 'mypost' && id) {
        try {
          const response = await axios.get(`${BASE_URL}/post/me/${url}`, {
            headers: {
              Authorization: `Bearer ${cookie.load('accessToken')}`,
              'Access-Control-Allow-Origin': '*',
            },
          });
          const responseData: PostType[] = response.data.data;
          setPostData(responseData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    PostListData();
  }, [activeSection, id]);

  // 섹션 변경 핸들러
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div>
      <BackgroundWrap>
        <Bg>
          {data && (
            <>
              <Container>
                <Container1>
                  <ProfileImgWrap>
                    <ProfileImg
                      bgImg={data.imageUrls[0] ? data.imageUrls[0] : user}
                    />
                    {data.imageUrls && data.imageUrls.length > 0 && (
                      <ProfileImgDeleteButton
                        style={{ fontSize: '2rem' }}
                        onClick={deleteProfileImg}
                      />
                    )}
                  </ProfileImgWrap>
                  <NickName style={{ marginTop: '2rem' }}>
                    {data.nickname}
                  </NickName>
                  <NickName>
                    {data.age}대 {data.gender === 'MAN' ? '남자' : '여자'}
                  </NickName>
                  <ChangeBtn onClick={handleModal} type="button">
                    프로필 수정
                  </ChangeBtn>
                  <MyPostList onClick={() => handleSectionChange('mypost')}>
                    내 게시물
                  </MyPostList>
                  <MyCommentList onClick={() => handleSectionChange('comment')}>
                    내 댓글
                  </MyCommentList>
                  <MyLikeList onClick={() => handleSectionChange('like')}>
                    위시 리스트
                  </MyLikeList>
                </Container1>
              </Container>
              {modalOpen && (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfileEditModal open={modalOpen} onClose={handleModal} />
                </Suspense>
              )}
            </>
          )}
        </Bg>
      </BackgroundWrap>
    </div>
  );
}

export default Profile;

const BackgroundWrap = styled.div`
  height: 55rem;
  width: 100%;
  display: flex;
  font-family: 'NanumSquareNeoTTF';
  justify-content: center;
`;
const Bg = styled.div`
  height: 49rem;
  width: 40%;
  margin-left: -15rem;
  font-family: 'NanumSquareNeoTTF';
  flex-direction: row;
`;

const BgComment = styled.div`
  height: 47rem;
  width: 60rem;
  margin-left: -3rem;
  overflow: visible;
`;

const MypostWrap = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: -2rem;
`;

const BgMypost = styled.div`
  height: 47rem;
  width: 60rem;
  margin-top: 2.5rem;
  margin-left: -3rem;
  display: flex;
  flex-direction: row; // 추가
`;

const BgMylike = styled.div`
  height: 47rem;
  width: 60rem;
  margin-top: 2.5rem;
  margin-left: -3rem;
`;

const Container = styled.div`
  text-align: center;
  z-index: 90;
  width: 20rem;
  height: 40rem;
  border-radius: 1.5rem;
  background-color: #70bffb;
  margin: auto;
  margin-top: 4rem;
  display: block;
  justify-content: center;
  overflow: visible;
`;

const Container1 = styled.div`
  z-index: 90;
  overflow: visible;
  height: 2rem;
  display: block;
`;

const Container2 = styled.div`
  z-index: 90;
  width: 40rem;
  height: 18rem;
  justify-content: center;
  margin-top: -1rem;
  display: block;
`;

const MypostTitle = styled.div`
  z-index: 90;
  position: relative;
  overflow: visible;
  width: 100%;
  height: 5rem;
  display: flex;

  align-items: center;
  font-size: 1.4rem;
`;
const PostWrap = styled.button`
  display: block;
  background-color: #f5f6f6;
  margin-left: 2rem;
  border-radius: 0.7rem;
  margin-bottom: 3rem;
  justify-content: center;
  border: none;
  width: 15rem;
  height: 18rem;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.11);
  position: relative;
`;
const PlaceLayout = styled.button`
  justify-content: right;
  display: flex;
  width: 14%;
  margin-left: 0.5rem;
  margin-top: 2.1rem;
  background-color: #f9f7f7;
  z-index: 999;
  border: none;
`;

const Where = styled.div`
  z-index: 90;
  position: relative;
  overflow: visible;
  width: 9rem;
  height: 5.8rem;
  display: flex;
  text-align: left;
  align-items: center;
  font-size: 1.1rem;
  color: #0792e3;
`;

const TopWrap = styled.div`
  display: flex;
  height: 4rem;
  width: 15rem;
  margin-top: -2rem;
  overflow: visible;
  border: none;
`;

const DateWrap = styled.div`
  display: block;
  height: 4rem;
  width: 12rem;
  margin-top: 1.1rem;
  margin-left: 0rem;
  text-align: left;
`;
const DateTitle = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 0.7rem;
  overflow: hidden;
`;

const Date = styled.div`
  font-size: 13px;
  overflow: hidden;
  margin-top: 0.5rem;

  color: #1aa5f5;
`;

const LikeWrap = styled.div`
  display: flex;
  height: 4rem;
  width: 95%;
  justify-content: right;
  margin-top: 1.5rem;
  position: absolute;
`;

const ImgWrap = styled.div`
  display: flex;
  margin-top: 0.8rem;
  height: 9.5rem;
  position: relative;
  width: 105%;
  margin-left: -0.3rem;
`;

const ProfileImgDeleteButton = styled(DeleteIcon)`
  background-color: #a3a3a3;
  border-radius: 2rem;
  cursor: pointer;
  padding: 0.25rem;
  color: #f5f5f5;
  position: relative;
  margin-top: 10rem;
  margin-left: -2.5rem;

  &:hover {
    position: center;
    background-color: #ababab;
  }
`;

const Img = styled.button`
  display: flex;
  opacity: 0.9;
  width: 100%;
  overflow: hidden;
  height: 9.5rem;
  background-size: 100% 100%;
  background-image: url(${gyeongju});
  background-repeat: no-repeat;
  transition: transform 0.5s;
  border: none;

  &:hover {
    position: center;
    opacity: 0.75;
    transform: scale(1.11); /* 이미지 확대 */
  }
`;

const PostTitle = styled.div`
  font-size: 0.8rem;
  width: 13rem;
  font-weight: bold;
  margin-top: 1.7rem;
  overflow: visible;
  text-align: center;
  margin-left: 1rem;
  height: 1.2rem;
`;

const MyLikeTitle = styled.div`
  z-index: 90;
  position: relative;
  overflow: visible;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;

const CommentPost = styled.div`
  z-index: 90;
  position: relative;
  overflow: visible;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #1f89f4;
`;
const HoverableIcon = styled(ArrowForwardIosIcon)`
  width: 200%;
  color: #b7b9bb;
`;

const LikeIcon = styled(likeIcon)`
  position: relative;

  &:hover {
    position: center;
    opacity: 0.9;
    transform: scale(1.11); /* 이미지 확대 */
  }
`;

const Comment = styled.button`
  z-index: 999;
  position: relative;
  overflow: visible;
  border: solid 2px #74777a;
  border-radius: 1rem;
  margin-top: 1rem;
  width: 90%;
  padding: 0.8rem;
  height: 5rem;
  font-size: 1.05rem;
  margin-left: -6rem;
  transition: all 0.3s ease-in-out; // 추가: 부드러운 변화를 위한 transition
  &:hover {
    position: center;
    opacity: 0.8;
    background-color: #f3f2f2;
    transform: scale(1.015); // 크기를 1.2배로 확대

    ${HoverableIcon} {
      color: #626262; // 변경하고자 하는 색상으로 수정
    }
  }
`;

const CommentTitle = styled.div`
  z-index: 90;
  position: relative;
  overflow: visible;
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
`;
const ProfileImgWrap = styled.div`
  display: flex;
  height: 12rem;
  position: relative;
  width: 100%;
`;
const ProfileImg = styled.div<{ bgImg: string }>`
  background-image: ${(props) => `url(${props.bgImg})`};
  height: 9rem;
  width: 9rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-left: 5.5rem;
  margin-top: 3rem;
  border-radius: 50%; /* 이미지를 둥글게 만듭니다 */
`;

const NickName = styled.div`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: white;
  overflow: visible;
`;

const Introduce = styled.div`
  font-size: 1.5rem;
  overflow: visible;
`;
const ChangeBtn = styled.button`
  font-size: 0.9rem;
  margin-top: 2rem;
  width: 6rem;
  height: 2.2rem;
  color: white;
  border: none;
  border-radius: 1rem;
  background-color: #17a9f8;
  cursor: pointer;
  position: relative;
  z-index: 99;
  &:hover {
    position: center;
    opacity: 0.8;
  }
`;

const MyPostList = styled.button`
  z-index: 90;
  position: relative;
  overflow: visible;
  background-color: #70bffb;
  height: 3rem;
  width: 100%;
  margin-top: 6rem;
  border: none;
  font-size: 1.3rem;
  color: white;
  cursor: pointer;
  &:hover {
    position: center;
    opacity: 0.8;
    background-color: #17a9f8;
  }
`;
const MyCommentList = styled.button`
  z-index: 90;
  position: relative;
  overflow: visible;
  background-color: #70bffb;
  height: 3rem;
  width: 100%;
  font-size: 1.3rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    position: center;
    opacity: 0.8;
    background-color: #17a9f8;
  }
`;
const MyLikeList = styled.button`
  z-index: 90;
  position: relative;
  overflow: visible;
  background-color: #70bffb;
  height: 3rem;
  width: 100%;
  font-size: 1.3rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    position: center;
    opacity: 0.8;
    background-color: #17a9f8;
  }
`;
