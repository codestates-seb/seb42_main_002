import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hobbyTags } from '../../../dummy/Tags';
import { selectedSearchTagState } from '../../../recoil/atoms/search';
import { TagDataType } from '../../../utils/types/tags/tags';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchInput from '../../Common/SearchInput/SearchInput';

const SearchTagFilter = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [searchTags, setSearchTags] = useRecoilState(selectedSearchTagState);

  // 고정된 태그 데이터
  const [tagList, setTagList] = useState([...hobbyTags]);
  // 수정 전 임시 태그 데이터
  const [tempTagList, setTempTagList] = useState(searchTags);

  // 태그 선택
  const onSelectTagHandler = (selectedTag: TagDataType) => {
    console.log('태그', selectedTag);

    if (!tempTagList.map((tag) => tag.tagId).includes(selectedTag.tagId)) {
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
