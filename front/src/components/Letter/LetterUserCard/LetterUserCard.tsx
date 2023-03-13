import { ReactComponent as ProfileIcon } from '../../../assets/img/user.svg';
import { formatDateToMonth, getAge } from '../../../utils';
import { ko } from 'date-fns/locale';

import RoundProfile from '../../Common/RoundProfile/RoundProfile';

import styles from './LetterUserCard.module.scss';

type LetterUserCardProps = {
  birthday: string;
  location: string;
  name: string;
  profile: string | null;
};

const LetterUserCard = ({
  location,
  name,
  birthday,
  profile,
}: LetterUserCardProps) => {
  // 생년월일 계산
  const formatedDate = formatDateToMonth(new Date(birthday), ko);

  // 나이 계산
  const age = getAge(new Date(birthday));

  return (
    <div className={styles.wrapper}>
      <div className={styles.usercard}>
        <div className={styles.profile_img}>
          <RoundProfile location={location} profile={profile} />
        </div>
        <div className={styles.user}>
          <h2 className={styles.name}>{name}</h2>
          <div
            className={styles.info}
          >{`${location} / ${formatedDate} / ${age}세`}</div>
        </div>
      </div>
      <button className={styles.profile_button}>
        <ProfileIcon />
      </button>
    </div>
  );
};

export default LetterUserCard;
