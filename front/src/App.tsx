import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/auth-context';
import Main from './components/Main/Main';
import BaseLayout from './components/Layouts/BaseLayout';
import Intro from './components/Intro/Intro';
import MyProfile from './components/MyProfile/MyProfile';
import NoneLayout from './components/Layouts/NoneLayout';

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
              <Route path="/main" element={<Main />} />
              <Route path="/letters" element={<Main />} />
              <Route path="/followings" element={<Main />} />
              <Route path="/voca" element={<Main />} />
              <Route path="/my-profile" element={<MyProfile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
