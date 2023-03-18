import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import { userFirstState, userLocationState } from '../../../recoil/atoms';
import { userTagState } from '../../../recoil/atoms/user/userTag';
import { allTagState } from '../../../recoil/selectors';
import { PATCH } from '../../../utils/axios';
import { TagDataType } from '../../../utils/types/tags/tags';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchInput from '../../Common/SearchInput/SearchInput';
import SummaryTitle from '../../Common/SummaryTitle/SummaryTitle';
import LanguageEditModal from '../LanguageEditModal/LanguageEditModal';
import LocationEditModal from '../LocationEditModal/LocationEditModal';

const TagEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const navigate = useNavigate();
  const { closeModal } = useModals();
  const [selectedUserLocation, setSelectedUserLocation] =
    useRecoilState(userLocationState);
  const [selectedUserTags, setSelectedUserTags] = useRecoilState(userTagState);
  const selectedUserFirstState = useRecoilValue(userFirstState);
  const hobbyTags = useRecoilValue(allTagState);
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

  const onSubmitHandler = async () => {
    if (onSubmit) {
      try {
        const prevState = selectedUserTags.map((tag) => tag.name);
        const newValue = changeTagIds.map((tag) => tag.name);
        const { status } = await PATCH('/members', {
          tag: [...prevState, ...newValue],
        });
        if (status === 200) {
          if (!selectedUserLocation) {
            // 첫 설정일 때
            setSelectedUserLocation(selectedUserFirstState);
            setSelectedUserTags(changeTagIds);
            closeModal(LanguageEditModal);
            closeModal(LocationEditModal);
            onClose && onClose();
            navigate('/welcome');
          } else {
            // 수정일 때
            setSelectedUserTags(changeTagIds);
            onClose && onClose();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit={!selectedUserLocation ? '설정 완료' : '수정'}
    >
      {!selectedUserLocation && (
        <SummaryTitle>
          관심 있는 <br />
          주제의 태그를 선택하세요
        </SummaryTitle>
      )}
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
