import { FcGoogle } from 'react-icons/fc';
import Button from '../Common/Button/Button';
import SignUpFooter from '../SignUp/SignUpFooter';
import LoginMain from './LoginMain';
import styles from './Login.module.scss';

const Login = () => {
  function googleLoginClick() {
    window.location.href = process.env.REACT_APP_GOOGLE_LOGIN_URL as string;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Button
          variant="secondary"
          size="lg"
          icon={<FcGoogle />}
          full
          onClick={googleLoginClick}
        >
          <span>구글이메일로 로그인하기</span>
        </Button>
        <LoginMain />
        <SignUpFooter
          isText="아직 가입하지 않았다면?"
          linkText="회원가입 하러가기"
          link="/signup"
        />
      </div>
    </div>
  );
};

export default Login;
