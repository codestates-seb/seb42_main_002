import { Suspense, useEffect } from 'react';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { letterUserListState, newLetterState } from '../../../recoil/atoms';
import { pageNationState } from '../../../recoil/atoms/pagination';
import { letterUserListSeletor } from '../../../recoil/selectors/letter';
import { LetterUserData, LetterUserListStateType } from '../../../utils';
import LetterStatusIcon from '../../Common/LetterStatusIcon/LetterStatusIcon';
import InnerSpinner from '../../Common/Spinner/InnerSpinner';
import NextUserCardList from '../../Common/UserCard/NextUserCardList';
import UserCard from '../../Common/UserCard/UserCard';
import UserQuit from '../../Common/UserCard/UserQuit/UserQuit';

import styles from './LetterUserList.module.scss';

const LetterUserList = () => {
  const setNewLetter = useSetRecoilState(newLetterState);
  const setPagination = useSetRecoilState(pageNationState);
  const [userList, setUserList] = useRecoilState(letterUserListState);
  const navigate = useNavigate();

  const addRecentData = (data: LetterUserListStateType) => {
    setUserList((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const resetList = () => {
    setUserList({
      content: [],
      isStop: false,
    });
    setPagination(0);
  };

  /**
   * @description 페이지 이동 시, 초기화
   */
  useEffect(() => {
    resetList();
    return resetList;
  }, []);

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

  const ChildrenButtonComponent = ({
    memberId,
    name,
    lastLetter,
    memberStatus,
  }: any) => {
    if (memberStatus === 'MEMBER_QUIT') {
      return <UserQuit />;
    }
    return (
      <button
        onClick={(event) => {
          onClickHandler(event, memberId, name);
        }}
      >
        {lastLetter && (
          <LetterStatusIcon
            status={lastLetter.status}
            isRead={lastLetter.isRead}
          />
        )}
      </button>
    );
  };

  const emptyProps = {
    title: '아직 편지를 교환한 사람이 없어요.',
    icon: <SlEnvolopeLetter className={styles.icon} size={'6rem'} />,
  };

  return (
    <>
      <ul className={styles.letter_list}>
        {userList.content.map((user: LetterUserData) => (
          <UserCard
            key={user.memberId}
            {...user}
            date={user.lastLetter.createdAt}
          >
            <ChildrenButtonComponent
              memberId={user.memberId}
              name={user.memberId}
              lastLetter={user.lastLetter}
            />
          </UserCard>
        ))}
        {/* 새로 불러오는 List */}
        <Suspense fallback={<InnerSpinner size="sm" />}>
          <NextUserCardList
            selector={letterUserListSeletor}
            addRecentData={addRecentData}
            empty={emptyProps}
            endText="마지막 스크롤 입니다."
          >
            <ChildrenButtonComponent />
          </NextUserCardList>
        </Suspense>
      </ul>
    </>
  );
};

export default LetterUserList;
