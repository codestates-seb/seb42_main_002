import { useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUsers } from 'react-icons/fi';
import LetterStatusIcon from '../Common/LetterStatusIcon/LetterStatusIcon';
import UserCard from '../Common/UserCard/UserCard';
import { FollowingListStateType, LetterUserData } from '../../utils';
import Button from '../Common/Button/Button';
import ButtonGroup from '../Common/Button/ButtonGroup';
import Flex from '../Common/Flex/Flex';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { followingListState } from '../../recoil/atoms/user/following';
import { pageNationState } from '../../recoil/atoms/pagination';
import NextUserCardList from '../Common/UserCard/NextUserCardList';
import InnerSpinner from '../Common/Spinner/InnerSpinner';
import { followingListSeletor } from '../../recoil/selectors/user/follwing';
import { newLetterState } from '../../recoil/atoms';
import styles from './Following.module.scss';

const Following = () => {
  const navigate = useNavigate();
  const setPagination = useSetRecoilState(pageNationState);
  const setNewLetter = useSetRecoilState(newLetterState);
  const [followings, setFollowings] = useRecoilState(followingListState);

  const resetList = () => {
    setFollowings({
      content: [],
      isStop: false,
    });
    setPagination(0);
  };
  /**
   * @description 페이지 이동 시, 초기화
   */
  useEffect(() => {
    return resetList;
  }, []);

  const addRecentData = (data: FollowingListStateType) => {
    setFollowings((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const moveProfileHandler = (id: number): void => {
    navigate(`/profile/${id}`);
  };

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
    isRead,
  }: any) => {
    return (
      <button
        onClick={(event) => {
          onClickHandler(event, memberId, name);
        }}
      >
        {lastLetter && (
          <LetterStatusIcon status={lastLetter.status} isRead={isRead} />
        )}
      </button>
    );
  };

  // TODO: 가운데 정렬 하고 싶은데 어떻게 해야할까요?
  const emptyProps = {
    title: '팔로잉한 친구가 없어요',
    children: (
      <Flex dir="column" align="center" gap="lg">
        <Flex.Col>
          <FiUsers className={styles.icon} size={'6rem'} />
        </Flex.Col>
        <Flex.Col>
          <ButtonGroup>
            <Button variant="primary" size="md" to="/search">
              친구 찾으러 가기
            </Button>
          </ButtonGroup>
        </Flex.Col>
      </Flex>
    ),
  };

  return (
    <>
      <Flex dir="column" justify="between" gap="md">
        <Flex.Col>
          <ButtonGroup justify="between">
            <Button
              variant="primary"
              size="sm"
              to="/search"
              icon={<FiSearch />}
            >
              친구 찾기
            </Button>
            <Button variant="secondary" size="sm" to="/blacklist">
              차단 친구 목록
            </Button>
          </ButtonGroup>
        </Flex.Col>
        <Flex.Col>
          <ul className={styles.letter_list}>
            {followings.content.map((user: LetterUserData) => (
              <UserCard
                key={user.memberId}
                {...user}
                date={user.lastLetter?.createdAt}
                onClick={moveProfileHandler}
              >
                {/* UserCard에 사용할 아이콘을 children으로 전달 */}
                <ChildrenButtonComponent
                  memberId={user.memberId}
                  name={user.memberId}
                  lastLetter={user.lastLetter}
                  isRead={user.isRead}
                />
              </UserCard>
            ))}
            {/* 새로 불러오는 List */}
            <Suspense fallback={<InnerSpinner size="sm" />}>
              <NextUserCardList
                selector={followingListSeletor}
                addRecentData={addRecentData}
                empty={emptyProps}
                endText="마지막 스크롤 입니다."
                onClick={moveProfileHandler}
              >
                <ChildrenButtonComponent />
              </NextUserCardList>
            </Suspense>
          </ul>
        </Flex.Col>
      </Flex>
    </>
  );
};

export default Following;
