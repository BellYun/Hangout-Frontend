import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import user from '../../../assets/image/user.webp';
import cookie from 'react-cookies';
import ClearIcon from '@mui/icons-material/Clear';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Hidden,
} from '@mui/material';
import { BASE_URL, getUserData, putUserData } from '@/api/api';

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [fileImage, setFileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [data, setData] = useState<any>(''); //프로필 수정 유저 정보

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target?.files?.[0];
    console.log('Uploaded file:', file);
    setSelectedFile(file);
    setFileImage(URL.createObjectURL(file));
  };

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
    setSelectedFile('');
  };

  const handleProfileImgSubmit = async (file: string) => {
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);

    try {
      const res = await axios({
        method: 'put',
        url: `${BASE_URL}/user/${data.id}/image`,
        data: formData,
        headers: {
          Authorization: `Bearer ${cookie.load('accessToken')}`,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('프로필 이미지가 변경되었습니다.');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const UserData = async () => {
      try {
        const response = await getUserData();
        const responseData = response.data.data;
        console.log(responseData);
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    if (open) {
      UserData();
    }
  }, [open]);
  //닉네임 값
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const Characters = /[!@#$%^&*(),.?":{}|<>]/;

    if (value.length <= 10) {
      if (Characters.test(value)) {
        alert('닉네임에는 특수문자를 사용할 수 없습니다!');
      } else {
        setNickname(value);
      }
    } else {
      alert('닉네임은 10자를 넘을 수 없습니다!');
    }
  };

  const handleNicknameSubmit = async (nickname: string) => {
    try {
      putUserData(nickname);
      alert('닉네임이 변경되었습니다');
      window.location.reload();
      console.log('성공');
    } catch (error) {
      console.error('실패 오류 : ', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: { borderRadius: 40, height: '46rem', padding: '1rem' },
      }}
    >
      <DialogTitle style={{ fontSize: '1.5rem', height: '5rem' }}>
        프로필 편집
      </DialogTitle>
      <DialogContent style={{ overflowX: 'hidden' }}>
        <CaptionText>프로필 사진 변경</CaptionText>
        <ProfileImgWrap>
          {fileImage && (
            <img
              alt="sample"
              src={fileImage}
              style={{
                maxWidth: '13rem', // 이미지의 최대 너비를 부모 요소에 맞춥니다.
                maxHeight: '13rem', // 이미지의 최대 높이를 부모 요소에 맞춥니다.
                display: 'flex',
                justifyContent: 'center',
                backgroundSize: 'cover',
              }}
            />
          )}
        </ProfileImgWrap>
        <ProfileImgBox>
          <FileNameBox>
            {selectedFile && <FileName>{selectedFile.name}</FileName>}
          </FileNameBox>
          <ProfileImgDeleteButton
            onClick={deleteFileImage}
          ></ProfileImgDeleteButton>
        </ProfileImgBox>

        <Caption>
          <ThumbnailUploadButton htmlFor="thumbnailUpload">
            이미지 업로드
            <ThumbnailUploadInput
              id="thumbnailUpload"
              type="file"
              onChange={handleThumbnailUpload}
            />
          </ThumbnailUploadButton>
        </Caption>
        <ImageChangeButton onClick={() => handleProfileImgSubmit(selectedFile)}>
          변경
        </ImageChangeButton>
        <Divider />
        <Caption>닉네임 변경</Caption>
        <NicknameBox>
          <NicknameInput
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <NicknameChangeButton onClick={() => handleNicknameSubmit(nickname)}>
            변경
          </NicknameChangeButton>
        </NicknameBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditModal;

const ThumbnailUploadButton = styled.label`
  display: inline-block;
  padding: 9px 10.5px;
  background-color: #518ccc;
  color: white;
  border: none;
  width: 7rem;
  border-radius: 7px;
  cursor: pointer;
  margin-left: 12.2rem;
  margin-top: 1rem;
  font-size: 0.95rem;

  &:hover {
    position: center;
    opacity: 0.9;
  }
`;

const Caption = styled.div`
  font-size: 1rem;
  color: #c4c8cb;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const CaptionText = styled.span`
  white-space: nowrap;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const ProfileImg = styled.div`
  background-color: #f0f0f7;
  border-radius: 0.5rem;
  padding: 11px;
  margin-right: 7rem;
  width: 21rem;
`;
const ThumbnailUploadInput = styled.input`
  display: none;
`;
const FileNameBox = styled.div`
  width: 100%;
  height: 2rem;
  padding: 11px;
  font-size: 0.8rem;
`;
const FileName = styled.span``;

const Divider = styled.div`
  height: 1px;
  background-color: #e5e5e5;
  margin: 3rem 0;
`;

const NicknameBox = styled.div`
  width: 500px;
  height: 50px;
  border-radius: 3px;
  background-color: #f0f0f7;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const ProfileImgWrap = styled.div`
  display: flex;
  height: 12rem;
  position: relative;
  width: 100%;
  justify-content: center;
`;

const ProfileImgBox = styled.div`
  width: 500px;
  height: 50px;
  border-radius: 3px;
  background-color: #f0f0f7;
  display: flex;
  padding: 0.5rem;
  margin-top: 1rem;
`;
const ProfileImgDeleteButton = styled(ClearIcon)`
  color: #d00707;
  width: 1rem;
  margin-right: 0.5rem;
  margin-top: 0.3rem;
  cursor: pointer;
`;

const NicknameInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  outline: none;
`;

const NicknameChangeButton = styled.button`
  background-color: #7ab0f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const ImageChangeButton = styled.button`
  background-color: #7ab0f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-left: 27.1rem;
  cursor: pointer;
`;
