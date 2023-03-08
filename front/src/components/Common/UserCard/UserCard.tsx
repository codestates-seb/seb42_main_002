import RoundProfile from '../RoundProfile/RoundProfile';
import UserCardInfo from './UserCardInfo/UserCardInfo';
import LetterStatusIcon from '../LetterStatusIcon/LetterStatusIcon';

import styles from './UserCard.module.scss';

const UserCard = () => {
  return (
    <div className={styles.usercard}>
      {/* PROFILE */}
      <div className={styles.profile_img}>
        <RoundProfile />
      </div>
      {/* INFO */}
      <div className={styles.profile_info}>
        <UserCardInfo />
      </div>
      {/* ICONS*/}
      <div className={styles.icon}>
        <LetterStatusIcon />
      </div>
    </div>
  );
};

export default UserCard;
