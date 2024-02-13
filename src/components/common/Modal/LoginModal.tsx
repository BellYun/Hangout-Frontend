import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { User, UUid } from '@/atom/atom';
import cookie from 'react-cookies';
import { postLogin, BASE_URL, BASE_HOST } from '@/api/api';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [email, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const setUserData = useSetRecoilState<User>(UUid);

  const navigate = useNavigate();
  const handleUseremailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUseremail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e:any) => {
    console.log('Login with useremail:', email);
    console.log('Login with password:', password);
    try{
      const response = await postLogin(email,password)
      const accessToken  = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      console.log(accessToken)
      console.log(refreshToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const expires = new Date()
      expires.setMinutes(expires.getMinutes() + 60)
      cookie.save('refreshToken', refreshToken, {

          path : '/',
          expires,
          // secure : true,
          httpOnly : true
        }
      );
      cookie.save('accessToken', accessToken, {
        path : '/',
        expires,
        // secure : true,
        //httpOnly : true
      }
    );
    alert('로그인에 성공하였습니다!')
      navigate('/');
      onClose();
      location.reload();
    }catch(e){
      alert(e.response.data.message)
    }
  };

  21
  function getGoogleLoginUrl() {
      // Google's OAuth 2.0 endpoint for requesting an access token
      var oauth2Endpoint = BASE_URL+'/auth/oauth2/authorize/google';
    
      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      var form = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);
      
    
      // // // Parameters to pass to OAuth 2.0 endpoint.
      var params = {'redirect-uri': BASE_HOST};
  
      // // Add form parameters as hidden input values.
      for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }
    
      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();
    }
    
    const handleGoogleLogin = async () => {
      console.log('google login 이동');
      try{
        getGoogleLoginUrl();
  
      } catch (error) {
        console.error('Error adding like:', error);
      }
    }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 40,
          height: '30rem',
          width: '35rem',
          padding: '1rem',
        },
      }}
    >
      <DialogTitle
        style={{ fontSize: '1.6rem', height: '8rem', textAlign: 'center' }}
      >
        로그인
      </DialogTitle>
      <DialogContent style={{ overflowX: 'hidden' }}>
        <InputBox>
          <Input
            type="text"
            placeholder="아이디"
            value={email}
            onChange={handleUseremailChange}
          />
        </InputBox>
        <InputBox>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputBox>
        <ButtonBox>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <LoginButton onClick={handleGoogleLogin}>
            <GoogleIcon style={{ marginRight: '0.5rem' }} />
            구글 로그인
          </LoginButton>
        </ButtonBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;

const InputBox = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #3db9ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;
