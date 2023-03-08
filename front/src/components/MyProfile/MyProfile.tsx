import { useAuth } from '../../context/auth-context';

const MyProfile = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default MyProfile;
