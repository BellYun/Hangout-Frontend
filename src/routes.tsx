import React from 'react';
import GlobalLayout from './pages/_layout';
import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/main';
import SignUpPage from './pages/SignUpPage';
import CreatePostPage from './pages/post/CreatePostPage';
import KMap from './pages/Map';
import Mypage from './pages/mypage/index';
import Travel from './pages/Travel';
import Detail from './pages/Detail';
import ErrorPage from './pages/Errorpage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/create-post',
        element: <CreatePostPage />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/board/:postId',
        element: <Detail />,
      },
      {
        path: '/register',
        element: <SignUpPage />,
      },
      {
        path: '/travel/:SearchType/:Keyword',
        element: <Travel />,
      },
      {
        path: '/map',
        element: <KMap />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export const pages = [{ route: '/' }];
