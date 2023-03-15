import {ko} from 'date-fns/locale';
import {formatDateToHour} from '../../../../utils';
import styles from './UserCardInfo.module.scss';

type UserCardInfoProps = {
  name: string;
  location: string; // 국가코드 2글자
  date: string | null; // 2023-02-28T19:12:01
};

const UserCardInfo = ({ name, location, date }: UserCardInfoProps) => {
  return (
    <div className={styles.user_info}>
      <div className={styles.user}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.location}>{location}</div>
      </div>

      {date && (
        <div className={styles.interaction_date}>
          {formatDateToHour(new Date(date), ko)}
        </div>
      )}
    </div>
  );
};

export default UserCardInfo;
