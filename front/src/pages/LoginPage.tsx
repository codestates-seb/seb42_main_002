import PageTitle from '../components/Common/PageTitle/PageTitle';
import LoginMain from '../components/Login/LoginMain';
import { ReactComponent as BackIcon } from '../assets/BackIcon.svg';
import SignUpFooter from '../components/SignUp/SignUpFooter';

export default function LoginPage() {
  return (
    <>
      <PageTitle title="Login" translate="로그인" prevIcon={<BackIcon />} />
      <LoginMain />
      <SignUpFooter
        isText="아직 가입하지 않았다면?"
        linkText="회원가입 하러가기"
        link="/#"
      />
    </>
  );
}
