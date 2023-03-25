import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  userLanguageState,
  userLocationState,
  userState,
  userTagState,
} from '../recoil/atoms';
import { SignInData, toast, UserData } from '../utils';
import { GET, POST } from '../utils/axios';
import { getCookie, removeCookie, setCookie } from '../utils/cookie';
import { TagDataType } from '../utils/types/tags/tags';

type AuthProviderProps = {
  children?: ReactNode;
};

type AuthContextProps = {
  user: UserData | null;
  login: (data: SignInData) => void;
  logout: () => void;
  getToken: () => void;
  setToken: (value: string, options?: any) => void;
  removeToken: () => void;
  getCurrentUserInfo: () => Promise<UserData | null>;
  resetState: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => undefined,
  logout: () => undefined,
  getToken: () => undefined,
  setToken: () => undefined,
  removeToken: () => undefined,
  getCurrentUserInfo: async () => null,
  resetState: () => undefined,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const navigate = useNavigate();
  const TOKEN_NAME = 'accessJwtToken';
  const resetUserInfo = useResetRecoilState(userState);
  const resetSelectedUserLocation = useResetRecoilState(userLocationState);
  const resetSelectedUserLanguage = useResetRecoilState(userLanguageState);
  const resetSelectedUserTag = useResetRecoilState(userTagState);

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
        setUserInfo(data);
        return data;
      }
    } catch (error) {
      setUserInfo(null);
    }
    return null;
  }, []);

  const login = async (data: SignInData) => {
    try {
      const response = await loginRequest(data);
      if (response === 'SUCCESS') {
        const user = await getCurrentUserInfo();
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
    getCookie(TOKEN_NAME);
  };

  const setToken = (value: string, options?: any) => {
    setCookie(TOKEN_NAME, value, options);
  };

  const removeToken = () => {
    removeCookie(TOKEN_NAME);
  };

  const value = useMemo(
    () => ({
      user: userInfo,
      login,
      logout,
      setToken,
      getToken,
      removeToken,
      getCurrentUserInfo,
      resetState,
    }),
    [userInfo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
