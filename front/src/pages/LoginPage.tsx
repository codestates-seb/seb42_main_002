import PageTitle from '../components/Common/PageTitle/PageTitle';
import LoginMain from '../components/Login/LoginMain';
import {ReactComponent as BackIcon} from '../assets/BackIcon.svg';
import SignUpFooter from '../components/SignUp/SignUpFooter';
import styles from '../components/Login/LoginMain.module.scss';
import {FcGoogle} from 'react-icons/fc';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <PageTitle title="Login" translate="로그인" prevIcon={<PrevButton />} />
      <button className={styles.google_btn}>
        <FcGoogle className={styles.google_icon} />
        구글이메일로 로그인하기
      </button>
      <LoginMain />
      <SignUpFooter
        isText="아직 가입하지 않았다면?"
        linkText="회원가입 하러가기"
        link="/signup"
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
