import { InputForm } from './SignUpPage';
import styles from './SignUpPage.module.scss';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';

export default function LoginPage() {
  return (
    <div className={styles.login_container}>
      <InputForm htmlfor="email" labelInner="이메일">
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWord" labelInner="비밀번호">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button className={styles.signUp_Btn}>로그인</button>
    </div>
  );
}
