import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/_layout';
import Main from './pages/main';

const CreatePostPage = lazy(() => import('./pages/post/CreatePostPage'));
const Detail = lazy(() => import('./pages/Detail'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const Travel = lazy(() => import('./pages/Travel'));
const KMap = lazy(() => import('./pages/Map'));
const ErrorPage = lazy(() => import('./pages/Errorpage'));
const Mypage = lazy(() => import('./pages/mypage/index'));

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
