import InputForm from '../SignUp/InputForm';
import styles from './LoginMain.module.scss';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';

import { useAuth } from '../../context/AuthContext';
import { signInUser } from '../../dummy/users';

export default function LoginMain() {
  const { login } = useAuth();
  return (
    <div className={styles.login_container}>
      <InputForm htmlfor="email" labelInner="이메일">
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWord" labelInner="비밀번호">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button className={styles.signUp_Btn} onClick={() => login(signInUser)}>
        로그인
      </button>
    </div>
  );
}
