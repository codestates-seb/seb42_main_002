import RoundProfile from '../RoundProfile/RoundProfile';
import UserCardInfo from './UserCardInfo/UserCardInfo';

import styles from './UserCard.module.scss';
import {useSetRecoilState} from 'recoil';
import {selectedUserInfo} from '../../../recoil/atoms';
import {LetterUserCardProps} from '../../Letter/LetterUserCard/LetterUserCard';
import {useNavigate} from 'react-router-dom';

type UserCardProps = {
  name: string;
  memberId: number;
  location: string; // 2자리 국가코드
  profile: string | null;
  birthday?: string;
  children?: React.ReactNode;
  date: string | null;
  onClick?: (id: number) => void;
};

const UserCard = ({
  name,
  memberId,
  location,
  birthday,
  profile,
  children,
  date,
  onClick,
}: UserCardProps) => {
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(selectedUserInfo);

  const onClickHandler = () => {
    // 클릭 시, 편지 유저 페이지로 이동
    const selectedUser: LetterUserCardProps = {
      name,
      birthday: birthday ? birthday : '',
      profile,
      location,
    };
    setUserInfo(selectedUser);
    navigate(`/letters/${memberId}`);
  };

  return (
    <li
      className={styles.usercard}
      role="presentation"
      onClick={onClick ? onClick.bind(null, memberId) : onClickHandler}
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
