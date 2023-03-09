import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import NoneLayout from './components/Layouts/NoneLayout';
import Intro from './components/Intro/Intro';
import BaseLayout from './components/Layouts/BaseLayout';
import MainPage from './pages/MainPage';
import MyProfilePage from './pages/MyProfilePage';
import LetterListPage from './pages/LetterListPage';
import GuidePage from './pages/GuidePage';
import HobbyTagPage from './components/Tag/AddHobbyTag';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <Routes>
              <Route element={<NoneLayout />}>
                <Route path="/" element={<Intro />} />
                <Route path="/login" element={<Intro />} />
                <Route path="/signup" element={<Intro />} />
              </Route>
              <Route element={<BaseLayout isAuth />}>
                <Route path="/main" element={<MainPage />} />
                <Route path="/letters" element={<LetterListPage />} />
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
