import { useNavigate } from 'react-router-dom';

import RoundProfile from '../RoundProfile/RoundProfile';
import UserCardInfo from './UserCardInfo/UserCardInfo';

import styles from './UserCard.module.scss';

type UserCardProps = {
  name: string;
  memberId: string | number; // 아직 미정
  location: string; // 2자리 국가코드
  birthday: string;
  profile: string | null;
  children?: React.ReactNode;
  date: string | null;
};

const UserCard = ({
  name,
  memberId,
  location,
  birthday,
  profile,
  children,
  date,
}: UserCardProps) => {
  const navigate = useNavigate();

  const onClickHandler = (): void => {
    navigate(`/letters/${memberId}`, {
      state: {
        name,
        birthday,
        profile,
        location,
      },
    });
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
