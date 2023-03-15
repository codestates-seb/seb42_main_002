import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import WelcomPage from './pages/WelcomPage';
import FollowingPage from './pages/FollowingPage';
import VocaPage from './pages/VocaPage';
import BlackListPage from './pages/BlackListPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route element={<NoneLayout />}>
                <Route path="/" element={<IntroPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/welcome" element={<WelcomPage />} />
              </Route>
              <Route element={<BaseLayout isAuth noTitle />}>
                <Route path="/main" element={<MainPage />} />
              </Route>
              <Route element={<BaseLayout isAuth />}>
                <Route path="/letters" element={<LetterListPage />} />
                <Route
                  path="/letters/:memberId"
                  element={<UserLetterListPage />}
                />
                <Route
                  path="/letters/:memberId/:letterId"
                  element={<LetterDetailPage />}
                />
                <Route path="/followings" element={<FollowingPage />} />
                <Route path="/blacklist" element={<BlackListPage />} />
                <Route path="/newLetter" element={<NewLetterPage />} />
                <Route path="/followings" element={<MainPage />} />
                <Route path="/voca" element={<VocaPage />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
                <Route path="/profile/:memberId" element={<ProfilePage />} />
                <Route path="/guide" element={<GuidePage />} />
              </Route>
            </Routes>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
