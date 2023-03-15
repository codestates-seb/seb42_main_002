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
import TagSearchBar from '../../Tag/TagSearchBar';

const TagEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [selectedUserTags, setSelectedUserTags] = useRecoilState(userTagState);
  const [changeTagIds, setChangeTags] = useState<TagDataType[]>([
    ...selectedUserTags,
  ]);
  const [tagList, setTagList] = useState([...hobbyTags]);

  // 태그 선택
  const onSelectTagHandler = (selectedTag: TagDataType) => {
    if (!changeTagIds.map((tag) => tag.id).includes(selectedTag.id)) {
      setChangeTags((currentState) => [...currentState, selectedTag]);
    } else {
      setChangeTags(changeTagIds.filter((tag) => tag.id !== selectedTag.id));
    }
  };

  // 태그 검색
  const onChangeSearchInputHandler = (filterTags: any) => {
    setTagList(filterTags);
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
      <TagSearchBar
        tags={hobbyTags}
        filterHandler={onChangeSearchInputHandler}
      />
      <Flex gap="sm" wrap="wrap">
        {tagList &&
          tagList.map((tag) => (
            <Flex.Col key={tag.name} cols={6}>
              <LabelButton
                full
                onClick={() => onSelectTagHandler(tag)}
                isActive={changeTagIds.map((tag) => tag.id).includes(tag.id)}
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
