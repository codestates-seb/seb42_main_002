import UserCard from '../../Common/UserCard/UserCard';
import { searchUserData } from '../../../dummy/searchUser';
import LetterStatusIcon from '../../Common/LetterStatusIcon/LetterStatusIcon';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { newLetterState } from '../../../recoil/atoms';
import styles from './SearchList.module.scss';

const SearchList = () => {
  const navigate = useNavigate();
  const setNewLetter = useSetRecoilState(newLetterState);

  const moveProfileHandler = (id: number) => {
    console.log('프로필로 이동');
    navigate(`/profile/${id}`);
  };

  const onClickHandler = (
    event: React.MouseEvent<Element, MouseEvent>,
    name: string
  ) => {
    event.stopPropagation();
    console.log('편지 작성하러 이동');
    // 작성할 사람 이름 저장
    navigate('/newletter');
    setNewLetter((prev) => ({
      ...prev,
      receiver: name,
    }));
  };

  return (
    <ul className={styles.user_list}>
      {searchUserData.map((user) => (
        <UserCard
          key={user.memberId}
          memberId={user.memberId}
          name={user.name}
          location={user.location}
          profile={user.profile}
          date={null}
          onClick={moveProfileHandler}
        >
          <div className={styles.button}>
            <LetterStatusIcon
              status={'SENT'}
              onClick={(event) => {
                onClickHandler(event, user.name);
              }}
            />
          </div>
        </UserCard>
      ))}
    </ul>
  );
};

export default SearchList;
