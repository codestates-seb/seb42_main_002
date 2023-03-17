import { useEffect, useState } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { LetterUserData } from '../../utils';
import { GET } from '../../utils/axios';
import Empty from '../Common/Empty/Empty';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';

import styles from './LetterList.module.scss';
// import { userData } from '../../dummy/userList';

const LetterList = () => {
  const [userList, setUserList] = useState<LetterUserData[]>([]);
  const [page, setPage] = useState<number>(0);

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
  const onClickHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
    console.log('아이콘 클릭');
    // 이벤트 전파 방지
    e.stopPropagation();
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
          // TODO: 백엔드 수정까지 임시
          birthday={String(new Date())}
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
