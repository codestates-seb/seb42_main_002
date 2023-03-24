import styles from './SignUp.module.scss';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { BsPencil } from 'react-icons/bs';
import { BsCalendar2Date } from 'react-icons/bs';
import { AiOutlineLock } from 'react-icons/ai';
import { FaVenus } from 'react-icons/fa';
import { FaMars } from 'react-icons/fa';
import { FaTransgender } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import InputForm from './InputForm';
import {
  emailValidation,
  nameValidation,
  genderValidation,
  birthdayValidation,
  passwordValidation,
  passwordCheckValidation,
} from '../../utils/signup/function';
import { POST } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../Common/Modal/AlertModal';
import Button from '../Common/Button/Button';

type UserDataType = {
  email: string;
  name: string;
  birthday: string;
  password: string;
  gender: string;
};

const SignUpMain = (): JSX.Element => {
  const [isBtnClick, setIsBtnClick] = useState([false, false, false]);
  const [isError, setIsError] = useState({
    eamil: false,
    name: false,
    gender: false,
    birthday: false,
    password: false,
    passwordCheck: false,
  });
  const [errorText, setErrorText] = useState({
    eamil: '',
    name: '',
    gender: '',
    birthday: '',
    password: '',
    passwordCheck: '',
  });
  const [passwordCheckData, setPasswordCheckData] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  // 성별 버튼 유효성 검사
  useEffect(() => {
    if (
      !(
        isBtnClick[0] === false &&
        isBtnClick[1] === false &&
        isBtnClick[2] === false
      )
    ) {
      setIsError({ ...isError, gender: false });
      setErrorText({ ...errorText, gender: '' });
    }
  }, [isBtnClick]);

  const isBtnClickHandler = (el: number): boolean | void => {
    const isBtnClickData = [...isBtnClick].map((ele, index) => {
      if (index === el) {
        return true;
      } else {
        return false;
      }
    });
    setIsBtnClick(isBtnClickData);
  };

  const genderCheck = (): string | void => {
    if (isBtnClick[0] === true) return 'MALE';
    else if (isBtnClick[1] === true) return 'FEMALE';
    else if (isBtnClick[2] === true) return 'OTHER';
    else {
      setIsError({ ...isError, gender: true });
      setErrorText({ ...errorText, gender: '성별을 선택하세요.' });
    }
  };

  function passWordProps(passwordData: string) {
    setPasswordCheckData(passwordData);
  }

  // 유효성 검사
  const signupValidation = (
    email: string,
    name: string,
    gender: boolean[],
    birthday: string,
    password: string,
    passwordCheck: string
  ) => {
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
      case 2 as 1: {
        const nameValidationResult = nameValidation(name);
        if (nameValidationResult !== undefined) {
          const { isErrorName, nameErrorText } = nameValidationResult;
          setIsError((pre) => {
            return { ...pre, name: isErrorName };
          });
          setErrorText((pre) => {
            return { ...pre, name: nameErrorText };
          });
          if (isErrorName === true) return (result = false);
        }
        /* falls through */
      }
      case 3 as 1: {
        const genderValidationResult = genderValidation(gender);
        if (genderValidationResult !== undefined) {
          const { isErrorGender, genderErrorText } = genderValidationResult;
          setIsError((pre) => {
            return { ...pre, gender: isErrorGender };
          });
          setErrorText((pre) => {
            return { ...pre, gender: genderErrorText };
          });
          if (isErrorGender === true) return (result = false);
        }
        /* falls through */
      }
      case 4 as 1: {
        const birthdayValidationResult = birthdayValidation(birthday);
        if (birthdayValidationResult !== undefined) {
          const { isErrorBirthday, birthdayErrorText } =
            birthdayValidationResult;
          setIsError((pre) => {
            return { ...pre, birthday: isErrorBirthday };
          });
          setErrorText((pre) => {
            return { ...pre, birthday: birthdayErrorText };
          });
          if (isErrorBirthday === true) return (result = false);
        }
        /* falls through */
      }
      case 5 as 1: {
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
        /* falls through */
      }

      case 6 as 1:
        {
          const passwordCheckValidationResult = passwordCheckValidation(
            passwordCheck,
            passwordCheckData
          );
          if (passwordCheckValidationResult !== undefined) {
            const { isErrorPasswordCheck, passwordCheckErrorText } =
              passwordCheckValidationResult;
            setIsError((pre) => {
              return { ...pre, passwordCheck: isErrorPasswordCheck };
            });
            setErrorText((pre) => {
              return { ...pre, passwordCheck: passwordCheckErrorText };
            });
            if (isErrorPasswordCheck === true) return (result = false);
          }
        }
        return result;
    }
  };

  async function signupRequest(userData: UserDataType) {
    try {
      const response = await POST('/users', userData);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    }
  }

  const signupSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (
      signupValidation(
        data.email as string,
        data.name as string,
        isBtnClick as boolean[],
        data.birthday as string,
        data.signup_password as string,
        data.passwordCheck as string
      )
    ) {
      const gender = genderCheck();
      const sentData: UserDataType = {
        name: data.name as string,
        email: data.email as string,
        password: data.signup_password as string,
        birthday: data.birthday as string,
        gender: gender as string,
      };
      console.log(sentData);
      signupRequest(sentData);
    }
  };

  return (
    <>
      {isSuccess ? (
        <AlertModal
          labelClose="수정예정"
          hideClose
          onSubmit={() => {
            setIsSuccess(false);
            navigate('/login');
          }}
        >
          회원가입이 완료되었습니다.🎉 <br />
          로그인 페이지로 이동하겠습니다.
        </AlertModal>
      ) : (
        <></>
      )}
      <form className={styles.container} onSubmit={signupSubmitHandler}>
        <InputForm
          htmlfor="email"
          labelInner="이메일"
          name="email"
          isError={isError.eamil}
          errorText={errorText.eamil}
          validation={signupValidation}
        >
          <MdOutlineAttachEmail className={styles.icon} />
        </InputForm>
        <InputForm
          htmlfor="text"
          labelInner="별명"
          name="name"
          isError={isError.name}
          errorText={errorText.name}
          validation={signupValidation}
        >
          <BsPencil className={styles.icon} />
        </InputForm>
        <p className={isError.gender ? styles.btn_error_text : styles.btn_text}>
          성별
        </p>
        <div
          className={
            isError.gender
              ? styles.button_error_container
              : styles.button_container
          }
        >
          {isError.gender ? (
            <p className={styles.error_text_gender}>{errorText.gender}</p>
          ) : null}
          <button
            type="button"
            onClick={() => {
              isBtnClickHandler(0);
            }}
            className={isBtnClick[0] ? styles.clicked : styles.not_clicked}
          >
            <FaMars className={styles.male_icon} /> 남자
          </button>
          <button
            type="button"
            onClick={() => {
              isBtnClickHandler(1);
            }}
            className={
              isBtnClick[1] ? `${styles.clicked}` : `${styles.not_clicked}`
            }
          >
            <FaVenus className={styles.female_icon} /> 여자
          </button>
          <button
            type="button"
            onClick={() => {
              isBtnClickHandler(2);
            }}
            className={
              isBtnClick[2] ? `${styles.clicked}` : `${styles.not_clicked}`
            }
          >
            <FaTransgender className={styles.ambiguous_icon} /> 기타
          </button>
        </div>
        <InputForm
          htmlfor="date"
          labelInner="생년월일"
          name="birthday"
          isError={isError.birthday}
          errorText={errorText.birthday}
          validation={signupValidation}
        >
          <BsCalendar2Date className={styles.icon} />
        </InputForm>
        <InputForm
          htmlfor="password"
          labelInner="비밀번호"
          name="signup_password"
          isError={isError.password}
          errorText={errorText.password}
          validation={signupValidation}
          passwordProps={passWordProps}
        >
          <AiOutlineLock className={styles.icon} />
        </InputForm>
        <InputForm
          htmlfor="password"
          labelInner="비밀번호 확인"
          name="passwordCheck"
          isError={isError.passwordCheck}
          errorText={errorText.passwordCheck}
          validation={signupValidation}
        >
          <AiOutlineLock className={styles.icon} />
        </InputForm>
        <Button variant="primary" size="lg" full type="submit">
          회원가입
        </Button>
      </form>
    </>
  );
};

export default SignUpMain;
