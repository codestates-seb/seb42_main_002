import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedSearchTagState } from '../../../recoil/atoms';
import { allTagState } from '../../../recoil/selectors';
import { TagDataType } from '../../../utils/types/tags/tags';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchInput from '../../Common/SearchInput/SearchInput';
import styles from './SearchTagFilter.module.scss';

const SearchTagFilter = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [searchTags, setSearchTags] = useRecoilState(selectedSearchTagState);
  const [isValid, setIsValid] = useState<boolean>(true);
  const hobbyTags = useRecoilValue(allTagState);

  // 고정된 태그 데이터
  const [tagList, setTagList] = useState([...hobbyTags]);
  // 수정 전 임시 태그 데이터
  const [tempTagList, setTempTagList] = useState<TagDataType[]>(
    searchTags ? searchTags : []
  );

  // 태그 선택
  const onSelectTagHandler = (selectedTag: TagDataType) => {
    if (
      !tempTagList
        .map((tag: TagDataType) => tag.tagId)
        .includes(selectedTag.tagId)
    ) {
      setTempTagList((currentState) => [...currentState, selectedTag]);
    } else {
      setTempTagList(
        tempTagList.filter((tag) => tag.tagId !== selectedTag.tagId)
      );
    }
  };

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: any) => {
    setTagList(filteredItems);
  };

  const onSubmitHandler = () => {
    if (tempTagList.length === 0) {
      setIsValid(false);
      return;
    }

    if (onSubmit) {
      setSearchTags(tempTagList);
      onSubmit();
    }
    if (onClose) {
      onClose();
    }
  };

  const onCloseHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onCloseHandler}
      labelSubmit="수정"
    >
      <div className={styles.valid}>
        {!isValid && <span>하나 이상의 태그를 선택해주세요.</span>}
      </div>
      <SearchInput
        items={hobbyTags}
        filterKey="name"
        filterHandler={onChangeSearchInputHandler}
      />
      <Flex gap="sm" wrap="wrap">
        {tagList &&
          tagList.map((tag) => (
            <Flex.Col key={tag.name} cols={6}>
              <LabelButton
                full
                onClick={() => onSelectTagHandler(tag)}
                isActive={tempTagList
                  .map((tag) => tag.tagId)
                  .includes(tag.tagId)}
              >
                <LabelButton.Content>{tag.name}</LabelButton.Content>
              </LabelButton>
            </Flex.Col>
          ))}
      </Flex>
    </FullPageModal>
  );
};

export default SearchTagFilter;
