import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/main';
import Layout from './pages/_layout';
import CreatePostPage from './pages/post/CreatePostPage';
import Detail from './pages/Detail';
import SignUpPage from './pages/SignUpPage';
import Travel from './pages/Travel';
import KMap from './pages/Map';
import ErrorPage from './pages/Errorpage';
import Mypage from './pages/mypage/index';

// const SignUpPage = lazy(() => import('./pages/SignUpPage'));
// const CreatePostPage = lazy(() => import('./pages/post/CreatePostPage'));
// const KMap = lazy(() => import('./pages/Map'));
// const Mypage = lazy(() => import('./pages/mypage/index'));
// const Travel = lazy(() => import('./pages/Travel'));
// const Detail = lazy(() => import('./pages/Detail'));
// const ErrorPage = lazy(() => import('./pages/Errorpage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
