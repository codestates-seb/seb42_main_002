import React from 'react';
import styles from './Intro.module.scss';
import { ReactComponent as MailIcon } from '../../assets/Intro/mailIcon.svg';
import { ReactComponent as OwlIcon } from '../../assets/Intro/owlIcon.svg';
import { ReactComponent as SpeechBubble } from '../../assets/Intro/speechBubble.svg';
import { useNavigate } from 'react-router-dom';

const Intro = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className={styles.intro_container}>
      <div className={styles.intro_title}>
        <MailIcon className={styles.mail_icon} />
        <p>전 세계에 마음이 맞는 친구들에게</p>
        <p>당신의 편지를 전달해드립니다.</p>
      </div>
      <div className={styles.intro_main}>
        <SpeechBubble className={styles.speech_bubble} />
        <div className={styles.speech_bubble_text}>
          <p>언어도 배우고~</p>
          <p>친구도 만들고~</p>
        </div>
        <OwlIcon />
        <p className={styles.owls_title_text}>Owls Letters</p>
      </div>
      <button
        className={styles.signup_btn}
        onClick={() => {
          navigate('/signup');
        }}
      >
        <p>회원가입</p>
      </button>
      <button
        className={styles.login_btn}
        onClick={() => {
          navigate('/login');
        }}
      >
        <p>로그인</p>
      </button>
    </div>
  );
};

export default Intro;
