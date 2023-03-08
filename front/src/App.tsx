import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/auth-context';
import NoneLayout from './components/Layouts/NoneLayout';
import MyProfile from './components/MyProfile/MyProfile';
import Intro from './components/Intro/Intro';
import BaseLayout from './components/Layouts/BaseLayout';
import MainPage from './page/MainPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<NoneLayout />}>
              <Route path="/" element={<Intro />} />
              <Route path="/login" element={<Intro />} />
              <Route path="/signup" element={<Intro />} />
            </Route>
            <Route element={<BaseLayout isAuth />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/letters" element={<MainPage />} />
              <Route path="/followings" element={<MainPage />} />
              <Route path="/voca" element={<MainPage />} />
              <Route path="/my-profile" element={<MyProfile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
