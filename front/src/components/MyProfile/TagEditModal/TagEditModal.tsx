import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { hobbyTags } from '../../../dummy/Tags';
import { userTagState } from '../../../recoil/atoms/user/userTag';
import { TagDataType } from '../../../utils/types/tags/tags';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchInput from '../../Common/SearchInput/SearchInput';

const TagEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [selectedUserTags, setSelectedUserTags] = useRecoilState(userTagState);
  const [changeTagIds, setChangeTags] = useState<TagDataType[]>([
    ...selectedUserTags,
  ]);
  const [tagList, setTagList] = useState([...hobbyTags]);

  // 태그 선택
  const onSelectTagHandler = (selectedTag: TagDataType) => {
    if (!changeTagIds.map((tag) => tag.tagId).includes(selectedTag.tagId)) {
      setChangeTags((currentState) => [...currentState, selectedTag]);
    } else {
      setChangeTags(
        changeTagIds.filter((tag) => tag.tagId !== selectedTag.tagId)
      );
    }
  };

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: any) => {
    setTagList(filteredItems);
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      setSelectedUserTags(changeTagIds);
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
                isActive={changeTagIds
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

export default TagEditModal;
