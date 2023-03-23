import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import NoneLayout from './components/Layouts/NoneLayout';
import IntroPage from './pages/IntroPage';
import BaseLayout from './components/Layouts/BaseLayout';
import MainPage from './pages/MainPage';
import MyProfilePage from './pages/MyProfilePage';
import LetterUserListPage from './pages/LetterUserListPage';
import LetterListPage from './pages/LetterListPage';
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
import RouterLayout from './components/Layouts/RouterLayout';
import { RouterElement } from './utils';
//dwa
const routerData: RouterElement[] = [
  {
    path: '/',
    element: <IntroPage />,
    isAuth: false,
    isFirstLogin: false,
    meta: {
      title: '인트로',
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
    isAuth: false,
    isFirstLogin: false,
    meta: {
      title: '로그인',
    },
  },
  {
    path: '/signup',
    element: <SignUpPage />,
    isAuth: false,
    isFirstLogin: false,
    meta: {
      title: '회원가입',
    },
  },
  {
    path: '/start',
    element: <StartPage />,
    isAuth: true,
    isFirstLogin: true,
    meta: {
      title: '첫 프로필 설정',
    },
  },
  {
    path: '/welcome',
    element: <WelcomePage />,
    isAuth: true,
    isFirstLogin: true,
    meta: {
      title: '프로필 설정 완료',
    },
  },
  {
    path: '/main',
    element: <MainPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '메인',
    },
  },
  {
    path: '/letters',
    element: <LetterUserListPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '편지목록',
    },
  },
  {
    path: '/letters/:memberId',
    element: <LetterListPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '편지목록',
    },
  },
  {
    path: '/letters/:memberId/:letterId',
    element: <LetterDetailPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '편지상세',
    },
  },
  {
    path: '/newLetter',
    element: <NewLetterPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '편지작성',
    },
  },
  {
    path: '/followings',
    element: <FollowingPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '친구목록',
    },
  },
  {
    path: '/search',
    element: <SearchPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '친구검색',
    },
  },
  {
    path: '/blacklist',
    element: <BlackListPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '차단친구목록',
    },
  },
  {
    path: '/voca',
    element: <VocaPage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '단어장',
    },
  },
  {
    path: '/profile/:memberId',
    element: <ProfilePage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '친구 프로필 상세',
    },
  },
  {
    path: '/my-profile',
    element: <MyProfilePage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '마이프로필',
    },
  },
  {
    path: '/guide',
    element: <GuidePage />,
    isAuth: true,
    isFirstLogin: false,
    meta: {
      title: '가이드',
    },
  },
  {
    path: '*',
    element: <NotFoundPage />,
    isAuth: false,
    isFirstLogin: false,
    meta: {
      title: 'NOT FOUND',
    },
  },
];

const routers = createBrowserRouter(
  routerData.map((router) => {
    if (router.isAuth) {
      return {
        path: router.path,
        element: (
          <RouterLayout router={router}>
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
          </RouterLayout>
        ),
      };
    } else {
      return {
        path: router.path,
        element: (
          <RouterLayout router={router}>
            <AuthProvider>
              <ModalProvider>
                <NoneLayout>{router.element}</NoneLayout>
              </ModalProvider>
            </AuthProvider>
          </RouterLayout>
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
