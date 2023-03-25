import { ReactComponent as CryOwls } from '../../../../assets/img/cry_owls.svg';
import styles from './UserQuit.module.scss';

const UserQuit = () => {
  return (
    <div className={styles.member_quit_container}>
      <div className={styles.member_quit}>탈퇴한 회원입니다.</div>
      <CryOwls />
    </div>
  );
};
export default UserQuit;
