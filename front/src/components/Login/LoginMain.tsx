import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRecoilValue } from 'recoil';
import { userLocationState } from '../../recoil/atoms';
import InputForm from '../SignUp/InputForm';
import styles from './LoginMain.module.scss';
import {
  emailValidation,
  passwordValidation,
} from '../../utils/signup/function';
import { useState } from 'react';
import { POST } from '../../utils/axios/fetch';
import { setCookie } from '../../utils/cookie';

const LoginMain = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const selectedUserLocation = useRecoilValue(userLocationState);

  const [isError, setIsError] = useState({
    eamil: false,
    password: false,
  });
  const [errorText, setErrorText] = useState({
    eamil: '',
    password: '',
  });

  // TODO : 추후 수정 예정 (RIA)
  const onLoginHandler = async () => {
    await login({ email: 'rockbell89@gmail.com', password: '1234' });
    if (!selectedUserLocation) {
      navigate('/start');
    } else {
      navigate('/main');
    }
  };

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

  async function loginRequest(userData: any) {
    try {
      const response = await POST('/login', userData);
      setCookie('accessJwtToken', response.headers.authorization);
      // 첫 회원인지 아닌지 분기 갈라서 navigate
    } catch (error) {
      console.log(error);
    }
  }

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (
      loginValidation(data.loginEmail as string, data.Loginpassword as string)
    ) {
      const userData = {
        // 일단 회원가입 작업안해서 임시로 하드코딩으로 넣음.
        username: 'test@test.com',
        password: 'test123!',
      };
      loginRequest(userData);
      console.log(`아이디: ${data.loginEmail} 비밀번호: ${data.Loginpassword}`);
    } else {
      alert('아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <>
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
      {/** 추후 삭제 예정 */}
      <button className={styles.signUp_Btn} onClick={onLoginHandler}>
        임시 로그인
      </button>
    </>
  );
};
export default LoginMain;
