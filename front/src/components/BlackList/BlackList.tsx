import {useNavigate} from 'react-router-dom';
import {TiDeleteOutline} from 'react-icons/ti';
import UserCard from '../Common/UserCard/UserCard';
import {blackListData} from '../../dummy/userList';
import {BlackUserData} from '../../utils';
import styles from './BlackList.module.scss';

const BlackList = () => {
  const navigate = useNavigate();

  // API 연결
  const deleteBlackListHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('블랙 리스트에서 해제');
  };

  const moveProfileHandler = (id: number): void => {
    console.log('프로필로 이동');
    navigate(`/profile/${id}`);
  };

  return (
    <ul className={styles.letter_list}>
      {blackListData.map((user: BlackUserData) => (
        <UserCard
          key={user.memberId}
          memberId={user.memberId}
          name={user.name}
          location={user.location}
          profile={user.profile}
          date={null}
          onClick={moveProfileHandler}
        >
          <button className={styles.button} onClick={deleteBlackListHandler}>
            <TiDeleteOutline size="1.7rem" />
          </button>
        </UserCard>
      ))}
    </ul>
  );
};

export default BlackList;
