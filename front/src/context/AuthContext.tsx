import {createContext, ReactNode, useContext, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {SignInData, UserData} from '../utils';

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
  const [user, setUser] = useLocalStorage('user', '');
  const navigate = useNavigate();

  const login = (data: SignInData) => {
    setUser(data);
    navigate('/main', { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
