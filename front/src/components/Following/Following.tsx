import {useNavigate} from 'react-router-dom';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';
import {LetterUserData} from '../../utils';
import {userData} from '../../dummy/userList';
import styles from './Following.module.scss';

const Following = () => {
  const navigate = useNavigate();

  const moveProfileHandler = (id: number): void => {
    navigate(`/profile/${id}`);
  };

  return (
    <ul className={styles.letter_list}>
      {userData.map((user: LetterUserData) => (
        <UserCard
          key={user.memberId}
          {...user}
          date={user.lastLetter.createdAt}
          onClick={moveProfileHandler}
        >
          {/* UserCard에 사용할 아이콘을 children으로 전달 */}
          <LetterStatusIcon
            status={user.lastLetter.status}
            isRead={user.lastLetter.isRead}
          />
        </UserCard>
      ))}
    </ul>
  );
};

export default Following;
