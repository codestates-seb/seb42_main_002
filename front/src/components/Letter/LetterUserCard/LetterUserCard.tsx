import classNames from 'classnames';
import { ko } from 'date-fns/locale';
import { ReactComponent as ProfileIcon } from '../../../assets/img/user.svg';
import { formatDateToMonth, getAge } from '../../../utils';
import { LOCATION_CODE } from '../../../utils/enums/common/common.enum';
import { locationTransformer } from '../../../utils/common';
import RoundProfile from '../../Common/RoundProfile/RoundProfile';
import styles from './LetterUserCard.module.scss';
import { useNavigate } from 'react-router-dom';
import UserQuit from '../../Common/UserCard/UserQuit/UserQuit';

export type LetterUserCardProps = {
  birthday: string;
  location: LOCATION_CODE;
  name: string;
  profile: string | null;
  memberId: null | number;
  memberStatus?: string;
  cursor?: boolean;
};

const LetterUserCard = ({
  location,
  name,
  birthday,
  profile,
  memberId,
  memberStatus,
  cursor = true,
}: LetterUserCardProps) => {
  const navigate = useNavigate();

  // 생년월일 계산
  const formatedDate = formatDateToMonth(new Date(birthday), ko);

  // 나이 계산
  const age = getAge(new Date(birthday));

  const classNameValue = classNames(styles.wrapper, {
    [styles.cursor]: !cursor,
  });

  const onClickHandler = () => {
    navigate(`/profile/${memberId}`);
  };

  return (
    <div className={classNameValue}>
      <div className={styles.usercard}>
        <div className={styles.user_info}>
          <div className={styles.profile_img}>
            <RoundProfile location={location} profile={profile} />
          </div>
          <div className={styles.user}>
            <h2 className={styles.name}>{name}</h2>
            <div className={styles.info}>
              {locationTransformer(location)}
              {formatedDate && <> {`/ ${formatedDate} / ${age}세`}</>}
            </div>
          </div>
        </div>
        {memberStatus === 'MEMBER_QUIT' ? <UserQuit /> : null}
      </div>
      {memberStatus === 'MEMBER_QUIT' ? null : (
        <button className={styles.profile_button} onClick={onClickHandler}>
          <ProfileIcon />
        </button>
      )}
    </div>
  );
};

export default LetterUserCard;
