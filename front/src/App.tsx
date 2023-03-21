import { ReactNode } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import NoneLayout from './components/Layouts/NoneLayout';
import IntroPage from './pages/IntroPage';
import BaseLayout from './components/Layouts/BaseLayout';
import MainPage from './pages/MainPage';
import MyProfilePage from './pages/MyProfilePage';
import LetterListPage from './pages/LetterListPage';
import UserLetterListPage from './pages/UserLetterListPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import GuidePage from './pages/GuidePage';
import ModalProvider from './context/ModalContext';
import LetterDetailPage from './pages/LetterDetailPage';
import NewLetterPage from './pages/NewLetterPage';
import WelcomePage from './pages/WelcomePage';
import FollowingPage from './pages/FollowingPage';
import VocaPage from './pages/VocaPage';
import BlackListPage from './pages/BlackListPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import StartPage from './pages/StartPage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NotFoundPage from './pages/NotFoundPage';

type RouterElement = {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  isFirstLogin?: boolean;
  meta?: {
    title?: string;
    subTitle?: string;
  };
  children?: RouterElement[];
};

const routerData: RouterElement[] = [
  {
    path: '/',
    element: <IntroPage />,
    isAuth: false,
    isFirstLogin: false,
  },
  {
    path: '/login',
    element: <LoginPage />,
    isAuth: false,
    isFirstLogin: false,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    isAuth: false,
    isFirstLogin: false,
  },
  {
    path: '/start',
    element: <StartPage />,
    isAuth: true,
    isFirstLogin: true,
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
    isAuth: true,
    isFirstLogin: true,
  },
  {
    path: '/main',
    element: <MainPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/letters',
    element: <LetterListPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/letters/:memberId',
    element: <UserLetterListPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/letters/:memberId/:letterId',
    element: <LetterDetailPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/newLetter',
    element: <NewLetterPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/followings',
    element: <FollowingPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/search',
    element: <SearchPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/blacklist',
    element: <BlackListPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/voca',
    element: <VocaPage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/profile/:memberId',
    element: <ProfilePage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/my-profile',
    element: <MyProfilePage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '/guide',
    element: <GuidePage />,
    isAuth: true,
    isFirstLogin: false,
  },
  {
    path: '*',
    element: <NotFoundPage />,
    isAuth: false,
    isFirstLogin: false,
  },
];

const routers = createBrowserRouter(
  routerData.map((router) => {
    if (router.isAuth) {
      return {
        path: router.path,
        element: (
          <AuthProvider>
            <ModalProvider>
              <BaseLayout
                isAuth={router.isAuth}
                isFirstLogin={router.isFirstLogin}
              >
                {router.element}
              </BaseLayout>
            </ModalProvider>
          </AuthProvider>
        ),
      };
    } else {
      return {
        path: router.path,
        element: (
          <AuthProvider>
            <ModalProvider>
              <NoneLayout>{router.element}</NoneLayout>
            </ModalProvider>
          </AuthProvider>
        ),
      };
    }
  })
);

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
