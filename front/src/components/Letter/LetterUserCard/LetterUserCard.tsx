import RoundProfile from '../../Common/RoundProfile/RoundProfile';
import { ReactComponent as ProfileIcon } from '../../../assets/img/user.svg';
import styles from './LetterUserCard.module.scss';

const LetterUserCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.usercard}>
        <div className={styles.profile_img}>
          <RoundProfile location={'KR'} profile={''} />
        </div>
        <div className={styles.user}>
          <h2 className={styles.name}>{'안아영'}</h2>
          <div className={styles.info}>{'일본 / 12월 24일 / 28세'}</div>
        </div>
      </div>
      <button className={styles.profile_button}>
        <ProfileIcon />
      </button>
    </div>
  );
};

export default LetterUserCard;
