import styles from './UserCardInfo.module.scss';

type UserCardInfoProps = {
  name: string;
  location: string; // 국가코드 2글자
  date?: string; // 2023-02-28T19:12:01
};

const UserCardInfo = () => {
  return (
    <div className={styles.user_info}>
      <div className={styles.user}>
        <h2 className={styles.name}>하루히</h2>
        <div className={styles.location}>일본</div>
      </div>

      <div className={styles.interaction_date}>오전 4:30</div>
    </div>
  );
};

export default UserCardInfo;
