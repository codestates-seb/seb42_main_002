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
import HobbyTagPage from './components/Tag/AddHobbyTag';
import ModalProvider from './context/ModalContext';
import LetterDetailPage from './pages/LetterDetailPage';
import NewLetterPage from './pages/NewLetterPage';

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
              </Route>
              <Route element={<BaseLayout isAuth />}>
                <Route path="/main" element={<MainPage />} />
                <Route path="/letters" element={<LetterListPage />} />
                <Route
                  path="/letters/:memberId"
                  element={<UserLetterListPage />}
                />
                <Route
                  path="/letters/:memberId/:letterId"
                  element={<LetterDetailPage />}
                />
                <Route path="/newLetter" element={<NewLetterPage />} />
                <Route path="/followings" element={<MainPage />} />
                <Route path="/voca" element={<HobbyTagPage />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
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
