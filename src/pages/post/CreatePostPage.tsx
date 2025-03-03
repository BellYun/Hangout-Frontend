import Button from '@/components/common/Button';
import PostEditor from '@/components/post/Editor';
import HashTag from '@/components/post/Hashtag';
import { PostCardList } from '@/components/post/PostCardList';
import PostThumbnailInput from '@/components/post/PostThumbnailInput';
import { PostTitleInput } from '@/components/post/PostTitleInput';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { PostType } from '@/types/post';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import styled from 'styled-components';
import backgroundImg from '@/assets/image/Background.webp';
import Maps from '@/pages/post/CreateMap';
import { BASE_URL } from '@/api/api';
import { response } from 'msw';

interface ICreatePostFormData {
  // 여행 지역, 기간,인원
  title: string;
  content: string;
  tags: string[];
}

const CreatePostPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<any>();
  const [userData, setUserData] = useState<any>(); // 유저 정보를 저장
  const [jwt, setjwt] = useState<any>();
  const [listData, setListData] = useState<PostType[] | undefined>();
  const [nextId, setNextId] = useState<any>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const UserDatas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${cookie.load('accessToken')}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        console.log(response);
        const responseData = response.data.data;
        console.log(responseData);
        setUserData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    /// 여기서 처리 추가적으로 처리 가능///
    UserDatas();

    if (cookie.load('accessToken') === undefined) {
      alert('로그인이 되어있지 않습니다');
      navigate('/');
    }
  }, []);
  //현재 사용중인 유저 정보를 받아오는 axios

  useEffect(() => {
    const PostListData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/post/all/0`, {
          params: {
            searchType: '',
            searchKeyword: '',
          },
          headers: {
            Authorization: `Bearer ${cookie.load('accessToken')}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
        const responseData: PostType[] = response.data.data;
        setNextId(responseData[0].id + 1);
        console.log(responseData[0].id);
      } catch (error) {
        console.log(error);
      }
    };
    PostListData();
  }, []);
  //현재 작성된 게시물을 확인하는 axios

  const [title, setTitle] = useState(null);
  const handleTitleChange = (title: any) => {
    setTitle(title[0]);
    setImageFile(title[1]);
    console.log(title);
  };

  const [content, setContent] = useState('');
  const handleEditorChange = (content: string) => {
    setContent(content);
    console.log(content);
  };

  const [date, setDate] = useState('');
  const [travelat, setTravelAt] = useState<any[]>(['', '']);
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');

  const handleCardList = (content: any) => {
    console.log(content);
    setDate(content[0]);
    setTravelAt(content[1]);
    setNumber(content[2]);
  };

  useEffect(() => {
    console.log(travelat);
    if (travelat === null) {
    } else {
      setRegion(travelat[0]);
      setCity(travelat[1]);
    }
  }, [travelat]);

  const [mapLatlng, setMapLatlng] = useState({
    x: 37.5,
    y: 127.039573,
  });

  const handleMapClick = (latlng) => {
    setMapLatlng(latlng);
  };

  // const handleClick = async () => {
  //   console.log(jwt);
  //   try {
  //     console.log(date[1]);
  //     console.log(region);
  //     console.log(city);
  //     const response = await axios.post(
  //       `${BASE_URL}/post`,
  //       {
  //         title: title,
  //         context: content,
  //         tags: ['여행'],
  //         travelGender: '남성', //타입설정
  //         travelState: region,
  //         travelCity: city,
  //         travelAge: userData.age,
  //         travelDateStart: date[0],
  //         travelDateEnd: date[1],
  //         travelMember: number,
  //         latitude: mapLatlng.y, // 좌표값
  //         longitude: mapLatlng.x, // 좌표값
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookie.load('accessToken')}`,
  //           'Access-Control-Allow-Origin': '*',
  //         },
  //       },
  //     );
  //     if (imageFile) {
  //       const sharp = require('sharp');
  //       (async () => {
  //         const image = await sharp(imageFile)
  //           .resize(500, 500, { fit: 'contain' })
  //           .withMetadata()
  //           .toFormat('jpeg', { quality: 100 })
  //           .toFile('resizeIMG.jpeg', (err:any, info:any) => {
  //             console.log(`리사이징 이미지 info : ${JSON.stringify(info, null, 2)}`);
  //           });

  //         const formData = new FormData();
  //         formData.append('file', image);
  //         try {
  //           const res = await axios({
  //             method: 'post',
  //             url: `${BASE_URL}/post/${nextId}/images`,
  //             data: formData,
  //             headers: {
  //               Authorization: `Bearer ${cookie.load('accessToken')}`,
  //               'Access-Control-Allow-Origin': '*',
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           });
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       })();
  //     }
  //     if(response.status === 200){
  //       alert('게시물이 생성되었습니다!');
  //       navigate(`/board/${nextId}`)

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <PostLayout>
      <MapContainer>
        <Maps onMapClick={handleMapClick} />
      </MapContainer>

      <PostFlex>
        <CreateFlex>
          <PostCardList onValueChange={handleCardList} />
          <PostTitleInput onValueChange={handleTitleChange} />
          <PostThumbnailInput />
          <PostEditor onChangeEditor={handleEditorChange} />
          {/* <HashTag
          hashTags={[]}
          setHashTags={function (value: React.SetStateAction<string[]>): void {
            throw new Error('Function not implemented.');
          }}
        /> */}
          {/* <Btn onClick={handleClick} type="submit" children={'작성완료'} /> */}
        </CreateFlex>
      </PostFlex>
    </PostLayout>
  );
};

export default CreatePostPage;

const MapContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
`;

const PostLayout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PostImage = styled.div`
  height: 200px;
  background-image: url(${backgroundImg});
`;

const PostFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  display: flex;
`;
const CreateFlex = styled.div`
  height: 100%;
  width: 1000px;
  margin: auto;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

const Btn = styled.div`
  font-family: 'NanumSquareNeo-Variable';
  height: 3.5rem;
  width: 100%;
  border-radius: 1rem;
  background-color: #5dc1fa;
  margin-top: 1rem;
  color: white;
  font-size: 1.1rem;
  justify-content: center;
  align-items: center;
  display: flex;

  &:hover {
    position: center;
    opacity: 0.85;
    cursor: pointer;
  }
`;
