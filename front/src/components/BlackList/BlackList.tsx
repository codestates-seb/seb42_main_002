import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TiDeleteOutline } from 'react-icons/ti';
import { FiUsers } from 'react-icons/fi';
import AlertModal from '../Common/Modal/AlertModal';
import { blackListState } from '../../recoil/atoms';
import { blackListStateType, BlackUserDataType } from '../../utils';
import { DELETE } from '../../utils/axios';
import { pageNationState } from '../../recoil/atoms/pagination';
import InnerSpinner from '../Common/Spinner/InnerSpinner';
import { blackListSeletor } from '../../recoil/selectors/user/blacklist';
import UserCard from '../Common/UserCard/UserCard';
import NextUserCardList from '../Common/UserCard/NextUserCardList';
import styles from './BlackList.module.scss';

const BlackList = () => {
  const navigate = useNavigate();
  const setPagination = useSetRecoilState(pageNationState);
  const [blackUserList, setBlackUserList] = useRecoilState(blackListState);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [deleteMemberId, setDeleteMemberId] = useState<number>();

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

  /**
   * @description 차단 취소 API
   */
  const openAlertModalHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
    targetId: number
  ) => {
    event.stopPropagation();
    setIsAlertOpen(true);
    setDeleteMemberId(targetId);
  };
  const deleteBlackListHandler = async () => {
    try {
      const request = await DELETE(`/users/me/blocks?target=${deleteMemberId}`);
      if (request) {
        resetBlackList();
        setIsAlertOpen(false);
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
        onClick={(event) => openAlertModalHandler(event, memberId)}
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
      {isAlertOpen && (
        <AlertModal
          labelClose="닫기"
          labelSubmit="삭제"
          onClose={() => {
            setIsAlertOpen(false);
          }}
          onSubmit={deleteBlackListHandler}
        >
          차단을 취소하시겠습니까?
        </AlertModal>
      )}
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
            <DeleteBlackListButton memberId={user.memberId} />
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
