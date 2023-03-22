import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import UserCard from '../Common/UserCard/UserCard';
import { BlackUserData } from '../../utils';
import styles from './BlackList.module.scss';
import { DELETE, GET } from '../../utils/axios';
import Empty from '../Common/Empty/Empty';
import { FiUsers } from 'react-icons/fi';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const BlackList = () => {
  const navigate = useNavigate();
  const [blackUserList, setBlackUserList] = useState<BlackUserData[]>([]);
  const pageRef = useRef<number>(0);
  const isStopRef = useRef<boolean>(false);

  const getBlackList = async (page: number) => {
    if (isStopRef.current) return;
    try {
      const { data } = await GET(`/blocks?page=${page}&size=5`);
      if (data) {
        isStopRef.current = data.last;
        setBlackUserList((prev) => [...prev, ...data.content]);
      }
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  const sentinelRef = useInfiniteScroll(async (page: number) => {
    await getBlackList(page);
    pageRef.current++;
  }, pageRef.current);

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
      <>
        <Empty title="차단한 친구가 없어요">
          <FiUsers className={styles.icon} size={'6rem'} />
        </Empty>
        <div ref={sentinelRef}></div>
      </>
    );
  }

  return (
    <>
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
                onClick={(event) =>
                  deleteBlackListHandler(event, user.memberId)
                }
              >
                <TiDeleteOutline size="1.7rem" />
              </button>
            </UserCard>
          ))}
      </ul>
      <div ref={sentinelRef}></div>
    </>
  );
};

export default BlackList;
