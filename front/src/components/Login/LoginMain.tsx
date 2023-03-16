import { MdOutlineAttachEmail } from 'react-icons/md';
import { AiOutlineLock } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRecoilValue } from 'recoil';
import { userLocationState } from '../../recoil/atoms';
import InputForm from '../SignUp/InputForm';
import styles from './LoginMain.module.scss';

export default function LoginMain() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const selectedUserLocation = useRecoilValue(userLocationState);

  const onLoginHandler = async () => {
    await login({ email: 'rockbell89@gmail.com', password: '1234' });
    if (!selectedUserLocation) {
      navigate('/start');
    } else {
      navigate('/main');
    }
  };
  return (
    <div className={styles.login_container}>
      <InputForm htmlfor="email" labelInner="이메일">
        <MdOutlineAttachEmail className={styles.icon} />
      </InputForm>
      <InputForm htmlfor="passWord" labelInner="비밀번호">
        <AiOutlineLock className={styles.icon} />
      </InputForm>
      <button className={styles.signUp_Btn} onClick={onLoginHandler}>
        로그인
      </button>
      {}
    </div>
  );
}
