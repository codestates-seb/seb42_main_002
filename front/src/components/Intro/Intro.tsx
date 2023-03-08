// import React from 'react';
// import { useAuth } from '../../context/auth-context';
// import { signInUser } from '../../dummy/users';
import styles from './Intro.module.scss';
import { ReactComponent as MailIcon } from '../../assets/Intro/mailIcon.svg';
import { ReactComponent as OwlIcon } from '../../assets/Intro/owlIcon.svg';
import { ReactComponent as SpeechBubble } from '../../assets/Intro/speechBubble.svg';
import { ReactComponent as SignupBtn } from '../../assets/Intro/signupBtn.svg';
import { ReactComponent as LoginBtn } from '../../assets/Intro/loginBtn.svg';

const Intro = (): JSX.Element => {
  // const { login } = useAuth();
  return (
    <div className={styles.intro_container}>
      {/* <button onClick={() => login(signInUser)}>로그인</button> */}
      <div className={styles.intro_title}>
        <MailIcon className={styles.mail_icon} />
        <p>전 세계에 마음이 맞는 친구들에게</p>
        <p>당신의 편지를 전달해드립니다.</p>
      </div>
      <div className={styles.intro_main}>
        <SpeechBubble />
        <OwlIcon />
        <p>Owls Letters</p>
      </div>
      <button>
        <p>회원가입</p>
        <SignupBtn />
      </button>
      <button>
        <p>로그인</p>
        <LoginBtn />
      </button>
    </div>
  );
};

export default Intro;
