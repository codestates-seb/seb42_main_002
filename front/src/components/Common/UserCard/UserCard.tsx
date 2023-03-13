import RoundProfile from '../RoundProfile/RoundProfile';
import UserCardInfo from './UserCardInfo/UserCardInfo';

import styles from './UserCard.module.scss';

type UserCardProps = {
  name: string;
  memberId: number;
  location: string; // 2자리 국가코드
  profile: string | null;
  children?: React.ReactNode;
  date: string | null;
  onClick: (id: number) => void;
};

const UserCard = ({
  name,
  memberId,
  location,
  profile,
  children,
  date,
  onClick,
}: UserCardProps) => {
  return (
    <li
      className={styles.usercard}
      role="presentation"
      onClick={onClick.bind(null, memberId)}
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
