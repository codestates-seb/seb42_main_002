import InputForm from '../SignUp/InputForm';
import styles from './LoginMain.module.scss';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/signup/function';
import { useState } from 'react';
// import axios from 'axios';

const LoginMain = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState({
    eamil: false,
    password: false,
  });
  const [errorText, setErrorText] = useState({
    eamil: '',
    password: '',
  });

  const loginValidation = (email: string, password: string) => {
    let result = true;
    switch (1) {
      case 1: {
        const emailValidationResult = emailValidation(email);
        if (emailValidationResult !== undefined) {
          const { isErrorEmail, emailErrorText } = emailValidationResult;
          setIsError((pre) => {
            return { ...pre, eamil: isErrorEmail };
          });
          setErrorText((pre) => {
            return { ...pre, eamil: emailErrorText };
          });
          if (isErrorEmail === true) return (result = false);
        }
        /* falls through */
      }

      case 2 as 1:
        {
          const passwordValidationResult = passwordValidation(password);
          if (passwordValidationResult !== undefined) {
            const { isErrorPassword, passwordErrorText } =
              passwordValidationResult;
            setIsError((pre) => {
              return { ...pre, password: isErrorPassword };
            });
            setErrorText((pre) => {
              return { ...pre, password: passwordErrorText };
            });
            if (isErrorPassword === true) {
              return (result = false);
            }
          }
        }
        return result;
    }
  };

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (
      loginValidation(data.loginEmail as string, data.Loginpassword as string)
    ) {
      console.log(`아이디: ${data.loginEmail} 비밀번호: ${data.Loginpassword}`);
      navigate('/welcome');
    } else {
      alert('아이디와 비밀번호를 확인해주세요.');
    }
    //백엔드로 보낼 데이터

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
    // navigate('/welcome');
  };

  return (
    <form className={styles.login_container} onSubmit={loginSubmitHandler}>
      <InputForm
        htmlfor="email"
        labelInner="이메일"
        name="loginEmail"
        isError={isError.eamil}
        errorText={errorText.eamil}
        validation={loginValidation}
      >
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm
        htmlfor="passWord"
        labelInner="비밀번호"
        name="Loginpassword"
        isError={isError.password}
        errorText={errorText.password}
        validation={loginValidation}
      >
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button type="submit" className={styles.signUp_Btn}>
        로그인
      </button>
    </form>
  );
};
export default LoginMain;
