import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { RiEmotionSadLine } from 'react-icons/ri';
import UserCard from '../../Common/UserCard/UserCard';
import LetterStatusIcon from '../../Common/LetterStatusIcon/LetterStatusIcon';
import {
  newLetterState,
  searchUserListState,
  selectedSearchLangTagState,
  selectedSearchTagState,
  userState,
} from '../../../recoil/atoms';
import { pageNationState } from '../../../recoil/atoms/pagination';
import { SearchUserListStateType } from '../../../utils';
import InnerSpinner from '../../Common/Spinner/InnerSpinner';
import NextUserCardList from '../../Common/UserCard/NextUserCardList';
import { searchUserListSeletor } from '../../../recoil/selectors/search';
import styles from './SearchList.module.scss';

const SearchList = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const setNewLetter = useSetRecoilState(newLetterState);
  const setPagination = useSetRecoilState(pageNationState);
  const [searchLangTags, setSearchLangTags] = useRecoilState(
    selectedSearchLangTagState
  );
  const [searchTags, setSearchTags] = useRecoilState(selectedSearchTagState);
  const [searchUserList, setSearchUserList] =
    useRecoilState(searchUserListState);

  /**
   * @description 첫 진입 시, 태그 설정
   */
  useEffect(() => {
    if (!userInfo) return;
    setSearchLangTags(userInfo.language);
    setSearchTags(userInfo.tag);
  }, [userInfo]);

  const addRecentData = (data: SearchUserListStateType) => {
    setSearchUserList((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const resetList = () => {
    setSearchUserList({
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
    return () => {
      resetList();
    };
  }, []);

  /**
   * @description 태그 변경 시, page 리셋
   */
  useEffect(() => {
    resetList();
  }, [searchLangTags, searchTags]);

  const moveProfileHandler = (id: number) => {
    navigate(`/profile/${id}`);
  };

  const onClickHandler = (
    event: React.MouseEvent<Element, MouseEvent>,
    name: string
  ) => {
    event.stopPropagation();
    // 작성할 사람 이름 저장
    navigate('/newletter');
    setNewLetter((prev) => ({
      ...prev,
      receiver: name,
    }));
  };

  const ChildrenButtonComponent = ({ name }: any) => {
    return (
      <button
        onClick={(event) => {
          onClickHandler(event, name);
        }}
        className={styles.button}
      >
        <LetterStatusIcon status={'SENT'} />
      </button>
    );
  };

  const emptyProps = {
    title: '일치하는 유저가 없어요!',
    icon: <RiEmotionSadLine className={styles.icon} size={'6rem'} />,
  };

  return (
    <ul className={styles.user_list}>
      {searchUserList.content.map((user) => (
        <UserCard
          key={user.memberId}
          memberId={user.memberId}
          name={user.name}
          location={user.location}
          profile={user.profile}
          date={null}
          onClick={moveProfileHandler}
        >
          <ChildrenButtonComponent name={user.name} />
        </UserCard>
      ))}
      {/* 새로 불러오는 List */}
      <Suspense fallback={<InnerSpinner size="sm" />}>
        <NextUserCardList
          selector={searchUserListSeletor}
          addRecentData={addRecentData}
          empty={emptyProps}
          endText="마지막 스크롤 입니다."
        >
          <ChildrenButtonComponent />
        </NextUserCardList>
      </Suspense>
    </ul>
  );
};

export default SearchList;
