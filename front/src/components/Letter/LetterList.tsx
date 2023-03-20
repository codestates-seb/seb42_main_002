import { useEffect, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { newLetterState } from '../../recoil/atoms';
import { LetterUserData } from '../../utils';
import { GET } from '../../utils/axios';
import Empty from '../Common/Empty/Empty';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';

import styles from './LetterList.module.scss';
// import { userData } from '../../dummy/userList';

const LetterList = () => {
  const setNewLetter = useSetRecoilState(newLetterState);
  const [userList, setUserList] = useState<LetterUserData[]>([]);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  /**
   * @description API
   */
  const getLetterUserList = async () => {
    try {
      const { data } = await GET(`/letters?page=${page}&size=5`);
      setUserList(data.content);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    getLetterUserList();
  }, []);

  // 렌더링 시, 데이터 fetch
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
      <Empty title="아직 편지를 교환한 사람이 없어요.">
        <SlEnvolopeLetter className={styles.icon} size={'6rem'} />
      </Empty>
    );
  }

  return (
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
  );
};

export default LetterList;
