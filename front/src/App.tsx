import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/auth-context';
import NoneLayout from './components/Layouts/NoneLayout';
import Intro from './components/Intro/Intro';
import BaseLayout from './components/Layouts/BaseLayout';
import MainPage from './pages/MainPage';
import MyProfilePage from './pages/MyProfilePage';
import LetterListPage from './pages/LetterListPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<NoneLayout />}>
              <Route path="/" element={<Intro />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
            <Route element={<BaseLayout isAuth />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/letters" element={<LetterListPage />} />
              <Route path="/followings" element={<MainPage />} />
              <Route path="/voca" element={<MainPage />} />
              <Route path="/my-profile" element={<MyProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
