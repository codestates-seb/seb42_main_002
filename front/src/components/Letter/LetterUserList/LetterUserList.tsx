import { useRef, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { newLetterState } from '../../../recoil/atoms';
import { LetterUserData } from '../../../utils';
import { GET } from '../../../utils/axios';
import Empty from '../../Common/Empty/Empty';
import LastInfinite from '../../Common/LastInfinite/LastInfinite';
import LetterStatusIcon from '../../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../../Common/UserCard/UserCard';

import styles from './LetterUserList.module.scss';

const LetterUserList = () => {
  const setNewLetter = useSetRecoilState(newLetterState);
  const [userList, setUserList] = useState<LetterUserData[]>([]);
  const navigate = useNavigate();
  const pageRef = useRef<number>(0);
  const isStopRef = useRef<boolean>(false);

  /**
   * @description API
   */
  const getLetterUserList = async (page: number) => {
    if (isStopRef.current) return;
    try {
      const { data } = await GET(
        `/users/me/letters/inbox?page=${page}&size=10`
      );
      isStopRef.current = data.last;
      setUserList((prev) => [...prev, ...data.content]);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  const sentinelRef = useInfiniteScroll(async (page: number) => {
    await getLetterUserList(page);
    pageRef.current++;
  }, pageRef.current);

  const onClickHandler = (
    event: React.MouseEvent<Element, MouseEvent>,
    memberId: number,
    receiver: string
  ) => {
    // 이벤트 전파 방지
    event.stopPropagation();
    setNewLetter((prev) => ({
      ...prev,
      memberId,
      receiver,
    }));
    navigate('/newLetter');
  };

  if (userList.length === 0) {
    return (
      <>
        <Empty title="아직 편지를 교환한 사람이 없어요.">
          <SlEnvolopeLetter className={styles.icon} size={'6rem'} />
        </Empty>
        <div ref={sentinelRef}></div>
      </>
    );
  }

  return (
    <>
      <ul className={styles.letter_list}>
        {userList.map((user: LetterUserData) => (
          <UserCard
            key={user.memberId}
            {...user}
            date={user.lastLetter.createdAt}
          >
            <button
              onClick={(event) => {
                onClickHandler(event, user.memberId, user.name);
              }}
            >
              <LetterStatusIcon
                status={user.lastLetter.status}
                isRead={user.lastLetter.isRead}
              />
            </button>
          </UserCard>
        ))}
      </ul>
      <LastInfinite text="마지막 친구 입니다." ref={sentinelRef} />
    </>
  );
};

export default LetterUserList;
