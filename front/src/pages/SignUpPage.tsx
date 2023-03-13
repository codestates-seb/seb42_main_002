import PageTitle from '../components/Common/PageTitle/PageTitle';
import { ReactComponent as BackIcon } from '../assets/BackIcon.svg';
import SignUpMain from '../components/SignUp/SignUpMain';
import SignUpFooter from '../components/SignUp/SignUpFooter';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  return (
    <>
      <PageTitle
        title="Sign Up"
        translate="회원가입"
        prevIcon={<PrevButton />}
      />
      <SignUpMain />
      <SignUpFooter
        isText="이미 가입되어있다면?"
        linkText="로그인 하러가기"
        link="/login"
      />
    </>
  );
}

const PrevButton = () => {
  const naviagte = useNavigate();

  const onClickHandler = (): void => {
    console.log('뒤로가기 버튼');
    naviagte('/');
  };

  return (
    <button onClick={onClickHandler}>
      <BackIcon />
    </button>
  );
};
