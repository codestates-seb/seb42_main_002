import styles from './SignUp.module.scss';
import {MdOutlineAttachEmail} from 'react-icons/md';
import {BsCalendar2Date, BsPencil} from 'react-icons/bs';
import {AiOutlineLock} from 'react-icons/ai';
import {FaMars, FaTransgender, FaVenus} from 'react-icons/fa';
import {useState} from 'react';
import InputForm from './InputForm';

export default function SignUpMain() {
  const [isBtnClick, setIsBtnClick] = useState([false, false, false]);

  const isBtnClickHandler = (el: number) => {
    const isBtnClickData = [...isBtnClick].map((ele, index) => {
      if (index === el) {
        return true;
      } else {
        return false;
      }
    });
    setIsBtnClick(isBtnClickData);
  };

  return (
    <div className={styles.container}>
      <InputForm htmlfor="email" labelInner="이메일">
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="alias" labelInner="별명">
        <BsPencil className={styles.icon} />
      </InputForm>
      <p>성별</p>
      <div className={styles.button_Container}>
        <button
          onClick={() => {
            isBtnClickHandler(0);
          }}
          className={
            isBtnClick[0] ? `${styles.clicked}` : `${styles.not_clicked}`
          }
        >
          <FaMars className={styles.male_icon} /> 남자
        </button>
        <button
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
        htmlfor="birthDate"
        labelInner="생년월일"
        placeholder="1989-12-24"
      >
        <BsCalendar2Date className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWord" labelInner="비밀번호">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWordCheck" labelInner="비밀번호 확인">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button className={styles.signUp_Btn}>회원가입</button>
    </div>
  );
}
