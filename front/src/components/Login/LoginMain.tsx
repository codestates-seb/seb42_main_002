import InputForm from '../SignUp/InputForm';
import styles from './LoginMain.module.scss';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const LoginMain = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    //백엔드로 보낼 데이터
    console.log(`아이디: ${data.email} 비밀번호: ${data.password}`);

    // 로그인 요청 로직
    // try {
    //   const response1 = await axios.post('/login', {
    //     username: data.email,
    //     password: data.passWord,
    //   });
    //   console.log(response1.data);
    //   // 1) 토큰 쿠키에 저장
    //   // 2) 첫 이용자인지 확인 (토큰에서 맴버정보로 확인)
    //   // 3) 첫 이용자 일시 /welcom 페이지 이동 else /main 페이지 이동
    // } catch (error) {
    //   console.log(error);
    // }
    navigate('/welcome');
  };

  return (
    <form className={styles.login_container} onSubmit={loginSubmitHandler}>
      <InputForm htmlfor="email" labelInner="이메일" name="email">
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWord" labelInner="비밀번호" name="password">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button type="submit" className={styles.signUp_Btn}>
        로그인
      </button>
    </form>
  );
};
export default LoginMain;
