import { userData } from '../../dummy/userList';
import { LetterUserData } from '../../utils';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';
import styles from './LetterList.module.scss';

const LetterList = () => {
  // 렌더링 시, 데이터 fetch
  const onClickHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log('아이콘 클릭');
    // 이벤트 전파 방지
    e.stopPropagation();
  };

  return (
    <ul className={styles.letter_list}>
      {userData.map((user: LetterUserData) => (
        <UserCard
          key={user.memberId}
          {...user}
          date={user.lastLetter.createdAt}
        >
          {/* UserCard에 사용할 아이콘을 children으로 전달 */}
          <LetterStatusIcon
            status={user.lastLetter.status}
            onClick={onClickHandler}
            isRead={user.lastLetter.isRead}
          />
        </UserCard>
      ))}
    </ul>
  );
};

export default LetterList;
