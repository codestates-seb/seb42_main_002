import PageTitle from '../components/Common/PageTitle/PageTitle';
import { ReactComponent as BackIcon } from '../assets/BackIcon.svg';
import SignUpMain from '../components/SignUp/SignUpMain';
import SignUpFooter from '../components/SignUp/SignUpFooter';

export default function SignUpPage() {
  return (
    <>
      <PageTitle title="Sign Up" translate="회원가입" prevIcon={<BackIcon />} />
      <SignUpMain />
      <SignUpFooter
        isText="이미 가입되어있다면?"
        linkText="로그인 하러가기"
        link="/#"
      />
    </>
  );
}
