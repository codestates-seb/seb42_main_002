import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import UserCard from '../Common/UserCard/UserCard';
import { blackListData } from '../../dummy/userList';
import { BlackUserData } from '../../utils';
import styles from './BlackList.module.scss';
import { DELETE, GET } from '../../utils/axios';
import Empty from '../Common/Empty/Empty';
import { FiUsers } from 'react-icons/fi';

const BlackList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [blackUserList, setBlackUserList] = useState<BlackUserData[]>([]);

  const getBlackList = async () => {
    try {
      const { data } = await GET(`/blocks?page=${page}&size=5`);
      if (data) {
        setBlackUserList(data.content);
        console.log(data.content);
      }
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    getBlackList();
  }, []);

  // API 연결
  const deleteBlackListHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    targetId: number
  ) => {
    e.stopPropagation();
    try {
      const request = await DELETE(`/blocks/${targetId}`);
      if (request) {
        console.log(request);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const moveProfileHandler = (id: number): void => {
    console.log('프로필로 이동');
    navigate(`/profile/${id}`);
  };

  if (blackUserList.length === 0) {
    return (
      <Empty title="차단한 친구가 없어요">
        <FiUsers className={styles.icon} size={'6rem'} />
      </Empty>
    );
  }

  return (
    <ul className={styles.letter_list}>
      {blackUserList &&
        blackUserList.map((user: BlackUserData) => (
          <UserCard
            key={user.memberId}
            memberId={user.memberId}
            name={user.name}
            location={user.location}
            profile={user.profile}
            date={null}
            onClick={moveProfileHandler}
          >
            <button
              className={styles.button}
              onClick={(event) => deleteBlackListHandler(event, user.memberId)}
            >
              <TiDeleteOutline size="1.7rem" />
            </button>
          </UserCard>
        ))}
    </ul>
  );
};

export default BlackList;
