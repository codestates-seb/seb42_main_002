import { ko } from 'date-fns/locale';
import { formatDateToHour } from '../../../../utils';
import { locationTransformer } from '../../../../utils/common';
import { LOCATION_CODE } from '../../../../utils/enums/common/common.enum';
import styles from './UserCardInfo.module.scss';

type UserCardInfoProps = {
  name: string;
  location: LOCATION_CODE; // 국가코드 2글자
  date: string | null; // 2023-02-28T19:12:01
};

const UserCardInfo = ({ name, location, date }: UserCardInfoProps) => {
  return (
    <div className={styles.user_info}>
      <div className={styles.user}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.location}>{locationTransformer(location)}</div>
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
