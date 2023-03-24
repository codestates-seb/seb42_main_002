import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TiDeleteOutline } from 'react-icons/ti';
import { blackListState } from '../../recoil/atoms';
import { blackListStateType, BlackUserDataType } from '../../utils';
import { DELETE } from '../../utils/axios';
import { pageNationState } from '../../recoil/atoms/pagination';
import InnerSpinner from '../Common/Spinner/InnerSpinner';
import { blackListSeletor } from '../../recoil/selectors/user/blacklist';
import UserCard from '../Common/UserCard/UserCard';
import NextUserCardList from '../Common/UserCard/NextUserCardList';
import styles from './BlackList.module.scss';
import { FiUsers } from 'react-icons/fi';

const BlackList = () => {
  const navigate = useNavigate();
  const setPagination = useSetRecoilState(pageNationState);
  const [blackUserList, setBlackUserList] = useRecoilState(blackListState);

  const addRecentData = (data: blackListStateType) => {
    setBlackUserList((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const resetBlackList = () => {
    setBlackUserList({
      content: [],
      isStop: false,
    });
    setPagination(0);
  };

  /**
   * @description 페이지 이동 시, 초기화
   */
  useEffect(() => {
    return resetBlackList;
  }, []);

  // API 연결
  const deleteBlackListHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    targetId: number
  ) => {
    e.stopPropagation();
    try {
      const request = await DELETE(`/users/me/blocks?target=${targetId}`);
      if (request) {
        console.log(request);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const moveProfileHandler = (id: number): void => {
    navigate(`/profile/${id}`);
  };

  const DeleteBlackListButton = ({ memberId }: any) => {
    return (
      <button
        className={styles.button}
        onClick={(event) => deleteBlackListHandler(event, memberId)}
      >
        <TiDeleteOutline size="1.7rem" />
      </button>
    );
  };

  const emptyProps = {
    icon: <FiUsers className={styles.icon} size={'6rem'} />,
    title: '차단한 친구가 없어요',
  };

  return (
    <>
      <ul className={styles.letter_list}>
        {blackUserList.content.map((user: BlackUserDataType) => (
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
        {/* 새로 불러오는 List */}
        <Suspense fallback={<InnerSpinner size="sm" />}>
          <NextUserCardList
            selector={blackListSeletor}
            addRecentData={addRecentData}
            empty={emptyProps}
            endText="마지막 스크롤 입니다."
          >
            <DeleteBlackListButton />
          </NextUserCardList>
        </Suspense>
      </ul>
    </>
  );
};

export default BlackList;
