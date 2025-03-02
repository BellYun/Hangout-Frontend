import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { UUid, User } from '@/atom/atom';
import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import styled from 'styled-components';
import axios from 'axios';
import { getLogout } from '@/api/api';
import LoginModal from '../Modal/LoginModal';
// const LoginModal = React.lazy(() => import('../Modal/LoginModal'));

export const Login = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State variable for login modal
  const [userData, setUserData] = useRecoilState<User>(UUid);
  const [isLogin, setisLogin] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    IsLogin();
    console.log(userData.is_active);
  });

  const openLoginModal = () => {
    setLoginModalOpen(true); // Open the login modal
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false); // Close the login modal
  };

  const IsLogin = () => {
    const Token = cookie.load('accessToken');
    if (Token === undefined) {
      setisLogin(false);
    } else {
      setisLogin(true);
    }
  };

  const logout = async (e: any) => {
    console.log('로그아웃');
    try {
      const response = await getLogout();
      console.log(response);
    } catch (e) {}
    setUserData({
      is_active: false,
    });
    cookie.remove('accessToken', { path: '/' });

    navigate('/');

    location.reload();
  };

  const gotoMypage = () => {
    navigate('/mypage');
    location.reload();
  };

  const gotoWrite = () => {
    navigate('/create-post');
    location.reload();
  };

  const gotoRegister = () => {
    navigate('/register');
    location.reload();
  };
  if (isLogin === false) {
    return (
      <Layout>
        <LoginLayout onClick={openLoginModal}>로그인</LoginLayout>
        <SigninLayout onClick={gotoRegister}>회원가입</SigninLayout>
        {isLoginModalOpen && (
          <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
        )}
      </Layout>
    );
  } else {
    return (
      <div style={{ display: 'flex', height: '2.66rem' }}>
        <MyPageLayout onClick={gotoMypage}>내정보</MyPageLayout>
        <LogoutLayout onClick={logout}>로그아웃</LogoutLayout>
      </div>
    );
  }
};

const Layout = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const ILayout = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  background-color: #4ab8f7;
  color: white;
  border-radius: 1rem;
  font-weight: bolder;
  font-family: 'NanumSquareNeo-Variable';
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
const LoginLayout = styled(ILayout)`
  width: 5.5rem;
`;
const SigninLayout = styled(ILayout)`
  width: 6.5rem;
  margin-left: 1rem;
`;
const MyPageLayout = styled(ILayout)`
  width: 5.5rem;
  margin-left: 1rem;
`;
const LogoutLayout = styled(ILayout)`
  width: 6.5rem;
  margin-left: 1rem;
`;
