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
  const [passwordState, setPasswordState] = useState('');

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
    if (isBtnClick[0] === true) return '남자';
    else if (isBtnClick[1] === true) return '여자';
    else if (isBtnClick[2] === true) return '기타';
    else {
      setIsError({ ...isError, gender: true });
      setErrorText({ ...errorText, gender: '성별을 선택하세요.' });
    }
  };

  // 유효성 검사
  const validation = (
    email?: string,
    name?: string,
    gender?: boolean[],
    birthday?: string,
    password?: string,
    passwordCheck?: string
  ) => {
    if (!(email === undefined)) {
      if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
          email
        )
      ) {
        setIsError((pre) => {
          return { ...pre, eamil: true };
        });
        setErrorText({ ...errorText, eamil: '유효하지 않은 이메일 입니다.' });
        return;
      } else {
        setIsError({ ...isError, eamil: false });
        setErrorText({ ...errorText, eamil: '' });
      }
    }

    if (!(name === undefined)) {
      if (name.length < 2 || name.length > 10) {
        setIsError({ ...isError, name: true });
        setErrorText({
          ...errorText,
          name: '별명의 길이가 2이상 10 이하 이여야 합니다.',
        });
        return;
      } else if (!/^[\w가-힣]+$/i.test(name)) {
        setIsError({ ...isError, name: true });
        setErrorText({
          ...errorText,
          name: '한글, 영문, 숫자, 밑줄 만 사용 가능합니다.',
        });
        return;
      } else {
        setIsError({ ...isError, name: false });
        setErrorText({ ...errorText, name: '' });
      }
    }

    if (!(gender === undefined)) {
      if (gender[0] === false && gender[1] === false && gender[2] === false) {
        setIsError({ ...isError, gender: true });
        setErrorText({ ...errorText, gender: '성별을 선택하세요.' });
        return;
      }
    }

    if (!(birthday === undefined)) {
      if (birthday == '') {
        setIsError({ ...isError, birthday: true });
        setErrorText({
          ...errorText,
          birthday: '생년월일을 입력하세요.',
        });
        return;
      }
      const regex = /^(\d{4,5})-/;
      const result = birthday.match(regex)?.[1];
      if (!(result === undefined)) {
        if (parseInt(result) > 2019) {
          setIsError({ ...isError, birthday: true });
          setErrorText({
            ...errorText,
            birthday: '2020년 이상은 가입할수 없습니다.',
          });
          return;
        } else {
          setIsError({ ...isError, birthday: false });
          setErrorText({ ...errorText, birthday: '' });
        }
      }
    }

    if (!(password === undefined)) {
      setPasswordState(password);
      if (password.length < 6 || password.length > 20) {
        setIsError({ ...isError, password: true });
        setErrorText({
          ...errorText,
          password: '7글자이상 20글자 이하만 사용 가능합니다.',
        });
        return;
      } else {
        setIsError({ ...isError, password: false });
        setErrorText({ ...errorText, password: '' });
      }
    }

    if (!(passwordCheck === undefined)) {
      if (passwordCheck.length < 6 || passwordCheck.length > 20) {
        setIsError({ ...isError, passwordCheck: true });
        setErrorText({
          ...errorText,
          passwordCheck: '7글자이상 20글자 이하만 사용 가능합니다.',
        });
        return;
      }
      if (!(passwordCheck === passwordState)) {
        setIsError({ ...isError, passwordCheck: true });
        setErrorText({
          ...errorText,
          passwordCheck: '비밀번호와 일치하지 않습니다.',
        });
        return;
      } else {
        setIsError({ ...isError, passwordCheck: false });
        setErrorText({ ...errorText, passwordCheck: '' });
      }
    }

    return true;
  };

  const signupSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (
      validation(
        data.email as string,
        data.name as string,
        isBtnClick as boolean[],
        data.birthday as string,
        data.password as string,
        data.passwordCheck as string
      )
    ) {
      const gender = genderCheck();
      const sentData = {
        name: data.name,
        email: data.email,
        password: data.password,
        birthday: data.birthday,
        gender: gender,
      };
      console.log(sentData);
      //  서버로 보낼 데이터
    }
  };

  return (
    <form className={styles.container} onSubmit={signupSubmitHandler}>
      <InputForm
        htmlfor="email"
        labelInner="이메일"
        name="email"
        isError={isError.eamil}
        errorText={errorText.eamil}
        validation={validation}
      >
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm
        htmlfor="text"
        labelInner="별명"
        name="name"
        isError={isError.name}
        errorText={errorText.name}
        validation={validation}
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
        validation={validation}
      >
        <BsCalendar2Date className={styles.icon} />
      </InputForm>
      <InputForm
        htmlfor="password"
        labelInner="비밀번호"
        name="password"
        isError={isError.password}
        errorText={errorText.password}
        validation={validation}
      >
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <InputForm
        htmlfor="password"
        labelInner="비밀번호 확인"
        name="passwordCheck"
        isError={isError.passwordCheck}
        errorText={errorText.passwordCheck}
        validation={validation}
      >
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button type="submit" className={styles.signUp_Btn}>
        회원가입
      </button>
    </form>
  );
};

export default SignUpMain;
