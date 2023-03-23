import classNames from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';
import { useAuth } from '../../context/AuthContext';
import { ReactComponent as MailIcon } from '../../assets/img/intro/mailIcon.svg';
import { ReactComponent as OwlHead } from '../../assets/img/intro/owls_head.svg';
import { ReactComponent as OwlBody } from '../../assets/img/intro/owls_body.svg';
import { ReactComponent as OwlWingLeft } from '../../assets/img/intro/owls_wing_left.svg';
import { ReactComponent as OwlWingRight } from '../../assets/img/intro/owls_wing_right.svg';
import styles from './Intro.module.scss';
import Button from '../Common/Button/Button';
import Flex from '../Common/Flex/Flex';

const Intro = (): JSX.Element => {
  const navigate = useNavigate();
  const { getCurrentUserInfo } = useAuth();

  useEffect(() => {
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('access_token');
      if (accessToken) {
        // const refreshToken = urlParams.get('refresh_token');
        // 리프레쉬 토큰 보류
        setCookie('accessJwtToken', 'Bearer ' + accessToken);
        googlelogin();
      }
    }
  }, []);

  const googlelogin = async () => {
    try {
      const user = await getCurrentUserInfo();
      if (user?.location === null) {
        navigate('/start');
      } else {
        navigate('/main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(process.env.REACT_APP_BASE_URL);
  console.log(process.env.REACT_APP_NAME);

  return (
    <div className={styles.intro_container}>
      <div className={styles.intro_title}>
        <MailIcon className={styles.mail_icon} />
        <p>전 세계에 마음이 맞는 친구들에게</p>
        <p>당신의 편지를 전달해드립니다.</p>
      </div>
      <div className={styles.intro_main}>
        <div className={styles.owls_character}>
          <div className={styles.speech_bubble}>
            <div className={styles.speech_bubble_text}>
              <p>언어도 배우고~</p>
              <p>친구도 만들고~</p>
            </div>
          </div>
          <div className={styles.owls_body}>
            <div className={styles.owls_head}>
              <OwlHead />
            </div>
            <OwlBody />
            <div
              className={classNames(styles.owls_wing, styles.owls_wing_left)}
            >
              <OwlWingLeft />
            </div>
            <div
              className={classNames(styles.owls_wing, styles.owls_wing_right)}
            >
              <OwlWingRight />
            </div>
          </div>
        </div>
        <h1 className={styles.owls_title_text}>Owls Letters</h1>
      </div>
      <div className={styles.btn_wrapper}>
        <Flex dir="column" gap="md">
          <Flex.Col>
            <Button variant="primary" size="lg" full to="/signup">
              <p>회원가입</p>
            </Button>
          </Flex.Col>
          <Flex.Col>
            <Button variant="secondary" size="lg" full to="/login">
              <p>로그인</p>
            </Button>
          </Flex.Col>
        </Flex>
      </div>
    </div>
  );
};

export default Intro;
