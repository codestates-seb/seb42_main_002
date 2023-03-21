import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useLocalStorage from '../hooks/useLocalStorage';
import { userState } from '../recoil/atoms';
import { SignInData, UserData } from '../utils';
import { GET, POST } from '../utils/axios';
import { removeCookie, setCookie } from '../utils/cookie';

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthContextProps = {
  user: UserData | null;
  login: (data: SignInData) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();
  const TOKEN_NAME = 'accessJwtToken';

  // 로그인 요청
  const loginRequest = async (signData: SignInData) => {
    try {
      const { status, headers } = await POST('/login', signData);
      if (status === 200) {
        setCookie(TOKEN_NAME, headers.authorization);
        return 'SUCCESS';
      }
      return 'FAIL';
    } catch (error) {
      console.error(error);
    }
  };

  // 본인 정보 얻기
  const getUserInfo = async () => {
    try {
      const { data } = await GET('/members');
      if (data) {
        setUserInfo(data);
        return data;
      }
    } catch (error) {
      setUserInfo(null);
      return null;
    }
  };

  const login = async (data: SignInData) => {
    try {
      const response = await loginRequest(data);
      if (response === 'SUCCESS') {
        const user = await getUserInfo();
        if (!user.location) {
          navigate('/start');
        } else {
          navigate('/main');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUserInfo(null);
    removeCookie(TOKEN_NAME);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user: userInfo,
      login,
      logout,
    }),
    [userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
