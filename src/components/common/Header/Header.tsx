import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './Header.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { UUid, User } from '@/atom/atom';
import { Login } from './login';
import axios from 'axios';
import cookie from 'react-cookies';
import styled from 'styled-components';
import { BASE_URL } from '@/api/api';

export const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [userData, setUserData] = useRecoilState<User>(UUid);
  const [keyword, setKeyword] = useState<any>(null);

  const onSilentRefresh = async () => {
    try {
      const response = await axios.post(BASE_URL + '/auth/refresh-token');
      const accessToken = response.data.data.accessToken;
      console.log(accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } catch (e) {
      alert('다시 로그인해주세요');
      navigate('/');
    }
  };

  const gotoMain = () => {
    navigate('/');
    location.reload();
  };

  const IsLogin = () => {
    const Token = cookie.load('accessToken');
    if (Token === undefined) {
      setisLogin(false);
    } else {
      setisLogin(true);
    }
  };

  useEffect(() => {
    IsLogin();
    console.log(userData);
  });

  const search = (): void => {
    if (keyword === null) {
      alert('검색어를 입력해주세요');
    } else {
      navigate(`/travel/${Selected}/${keyword}`);
      location.reload();
    }
  };

  const setWord = (e: any) => {
    setKeyword(e.target.value);
    console.log(keyword);
  };

  const gotoWrite = () => {
    navigate('/create-post');
  };

  const [Selected, setSelected] = useState('title');
  const selectList = [
    {
      korea: '제목',
      eng: 'title',
    },
    {
      korea: '내용',
      eng: 'content',
    },
    {
      korea: '닉네임',
      eng: 'nickname',
    },
    {
      korea: '지역',
      eng: 'stateAndCity',
    },
  ];

  const handleSelect = (e: any) => {
    setSelected(e.target.value);
    console.log(Selected);
  };

  return (
    <Layout>
      <HeaderLayout>
        <SpacebetweenLayout>
          <Title onClick={gotoMain}>HANGOUT</Title>
          <Inputlayout>
            <Searchselect onChange={handleSelect} value={Selected}>
              {selectList.map((item) => (
                <Searchoption value={item.eng} key={item.eng}>
                  {item.korea}
                </Searchoption>
              ))}
            </Searchselect>
            <SearchInput
              placeholder="검색어를 입력해주세요"
              onChange={setWord}
              value={keyword}
            />
            <SearchButton onClick={search}>검색</SearchButton>
          </Inputlayout>
          <Login />
        </SpacebetweenLayout>
      </HeaderLayout>
    </Layout>
  );
};

export default Header;

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderLayout = styled.div`
  width: 1200px;
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: column;
  color: #3db9ff;
  justify-content: center;
`;

const SpacebetweenLayout = styled.div`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;

const Title = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  height: 100%;
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: #3db9ff;
  background-color: white;
  font-weight: bold;
  font-family: 'RixInooAriDuriR';
  border: none;
  transition: transform 0.7s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transform: scale(1.09);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const Inputlayout = styled.div`
  width: 50%;
  height: 100%;
  border: 1.5px groove #c2c3c5;
  border-radius: 0.9rem;
  padding-left: 1rem;
  padding-right: 1.5rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: medium;
  font-family: 'Pretendard-Regular';

  @media (max-width: 700px) {
    width: 70%;
  }
`;

const Searchselect = styled.select`
  border: none;
  color: #3db9ff;
  font-size: large;
  font-weight: bolder;
  cursor: pointer;
  &:focus {
    border: none;
  }
`;
const Searchoption = styled.option`
  color: #3db9ff;
  &:focus {
    border: none;
  }
`;
const SearchInput = styled.input`
  width: 80%;
  border: none;
  height: 100%;
  opacity: 0.7;
  font-size: large;
  font-weight: bolder;
  &:focus {
    outline: none;
  }
`;
const SearchButton = styled.button`
  width: 4rem;
  color: #3db9ff;
  border: none;
  font-size: large;
  font-weight: bolder;
  background-color: white;
  cursor: pointer;
`;
