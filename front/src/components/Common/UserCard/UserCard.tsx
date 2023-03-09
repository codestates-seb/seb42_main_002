import RoundProfile from '../RoundProfile/RoundProfile';
import UserCardInfo from './UserCardInfo/UserCardInfo';

import styles from './UserCard.module.scss';

type UserCardProps = {
  name: string;
  id: string | number; // 아직 미정
  location: string; // 2자리 국가코드
  profile: string | null;
  children?: React.ReactNode;
  date: string | null;
};

const UserCard = ({
  name,
  id,
  location,
  profile,
  children,
  date,
}: UserCardProps) => {
  const onClickHandler = (): void => {
    console.log('임시 클릭 핸들러');
  };

  return (
    <li
      className={styles.usercard}
      role="presentation"
      onClick={onClickHandler}
    >
      {/* PROFILE */}
      <div className={styles.profile_img}>
        <RoundProfile location={location} profile={profile} />
      </div>
      {/* INFO */}
      <div className={styles.profile_info}>
        <UserCardInfo name={name} location={location} date={date} />
      </div>
      {/* 타입에 따른 아이콘 변경*/}
      <div className={styles.children_wrapper}>{children}</div>
    </li>
  );
};

export default UserCard;
