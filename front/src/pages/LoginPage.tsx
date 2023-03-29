import PageTitle from '../components/Common/PageTitle/PageTitle';
import { ReactComponent as BackIcon } from '../assets/BackIcon.svg';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';

export default function LoginPage() {
  return (
    <>
      <PageTitle title="Login" translate="로그인" prevIcon={<PrevButton />} />
      <Login />
    </>
  );
}

const PrevButton = () => {
  const naviagte = useNavigate();

  const onClickHandler = (): void => {
    naviagte('/');
  };

  return (
    <button onClick={onClickHandler}>
      <BackIcon />
    </button>
  );
};
