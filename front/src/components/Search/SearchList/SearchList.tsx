import { useEffect, useState } from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';
import { GET } from '../../../utils/axios';
import UserCard from '../../Common/UserCard/UserCard';
import LetterStatusIcon from '../../Common/LetterStatusIcon/LetterStatusIcon';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  newLetterState,
  selectedSearchLangTagState,
} from '../../../recoil/atoms';
import { LanguageDataType, SearchUserDataType } from '../../../utils';
import { searchUserTagSelector } from '../../../recoil/selectors/search';
import { TagDataType } from '../../../utils/types/tags/tags';
import styles from './SearchList.module.scss';
import Empty from '../../Common/Empty/Empty';

const SearchList = () => {
  const navigate = useNavigate();
  const setNewLetter = useSetRecoilState(newLetterState);
  const searchLangTags = useRecoilValue(selectedSearchLangTagState);
  const searchTags = useRecoilValue(searchUserTagSelector);
  const [page, setPage] = useState<number>(0);
  const [searchUserList, setSearchUserList] = useState<SearchUserDataType[]>(
    []
  );

  /**
   * @description API
   */
  const getSearchUserList = async () => {
    try {
      const tags = searchTags.map((tag: TagDataType) => tag.name).join('+');
      const langs = searchLangTags
        .map((tag: LanguageDataType) => tag.nation)
        .join('+');

      const params = new URLSearchParams();
      params.append('tag', tags);
      params.append('lang', langs);
      params.append('page', String(page));
      params.append('size', '10');
      const queryString = params.toString();
      const { data } = await GET(`/users/search?${queryString}`);
      setSearchUserList(data.content);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    // 태그 변경 시,
    getSearchUserList();
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

  if (searchUserList.length === 0) {
    return (
      <Empty title="일치하는 유저가 없어요!">
        <RiEmotionSadLine className={styles.icon} size={'6rem'} />
      </Empty>
    );
  }

  return (
    <ul className={styles.user_list}>
      {searchUserList.map((user) => (
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
            onClick={(event) => {
              onClickHandler(event, user.name);
            }}
            className={styles.button}
          >
            <LetterStatusIcon status={'SENT'} />
          </button>
        </UserCard>
      ))}
    </ul>
  );
};

export default SearchList;
