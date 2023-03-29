import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  userLanguageState,
  userLocationState,
  userState,
  userTagState,
} from '../recoil/atoms';
import { SignInData, UserData } from '../utils';
import { GET, POST } from '../utils/axios';
import { getCookie, removeCookie, setCookie } from '../utils/cookie';

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthContextProps = {
  login: (data: SignInData) => void;
  logout: () => void;
  getToken: () => string;
  setToken: (value: string, options?: any) => void;
  removeToken: () => void;
  getCurrentUserInfo: () => Promise<UserData | null>;
  resetState: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  login: () => undefined,
  logout: () => undefined,
  getToken: () => '',
  setToken: () => undefined,
  removeToken: () => undefined,
  getCurrentUserInfo: async () => null,
  resetState: () => undefined,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);
  const resetUserInfo = useResetRecoilState(userState);
  const resetSelectedUserLocation = useResetRecoilState(userLocationState);
  const resetSelectedUserLanguage = useResetRecoilState(userLanguageState);
  const resetSelectedUserTag = useResetRecoilState(userTagState);

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
  const getCurrentUserInfo = useCallback(async (): Promise<UserData | null> => {
    try {
      const { data } = await GET('/users/me');
      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  }, []);

  const login = async (data: SignInData) => {
    try {
      const response = await loginRequest(data);
      if (response === 'SUCCESS') {
        const user = await getCurrentUserInfo();
        setUserInfo(user);
        if (user?.location === null) {
          navigate('/start');
        } else {
          navigate('/main');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetState = () => {
    removeCookie(TOKEN_NAME);
    resetUserInfo();
    resetSelectedUserLocation();
    resetSelectedUserLanguage();
    resetSelectedUserTag();
  };

  const logout = () => {
    resetState();
    navigate('/', { replace: true });
  };

  const getToken = () => {
    return getCookie(TOKEN_NAME);
  };

  const setToken = (value: string, options?: any) => {
    setCookie(TOKEN_NAME, value, options);
  };

  const removeToken = () => {
    removeCookie(TOKEN_NAME);
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      setToken,
      getToken,
      removeToken,
      getCurrentUserInfo,
      resetState,
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
