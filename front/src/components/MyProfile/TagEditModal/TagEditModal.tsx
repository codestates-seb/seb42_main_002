import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import { userLocationValueState } from '../../../recoil/atoms';
import { allTagState } from '../../../recoil/selectors';
import { userLocationSeletor } from '../../../recoil/selectors/user/userLocation';
import { userTagSeletor } from '../../../recoil/selectors/user/userTag';
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
    useRecoilState(userLocationSeletor);
  const [selectedUserTags, setSelectedUserTags] =
    useRecoilState<any[]>(userTagSeletor);
  const selectedUserLocationValue = useRecoilValue(userLocationValueState);
  const hobbyTags = useRecoilValue(allTagState);
  const [changeTags, setChangeTags] = useState<TagDataType[]>([
    ...selectedUserTags,
  ]);
  const [tagList, setTagList] = useState([...hobbyTags]);

  // 태그 선택
  const onSelectTagHandler = (selectTag: TagDataType) => {
    if (!changeTags.map((tag) => tag.name).includes(selectTag.name)) {
      setChangeTags((currentState) => [...currentState, selectTag]);
    } else {
      setChangeTags(changeTags.filter((tag) => tag.name !== selectTag.name));
    }
  };

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: any) => {
    setTagList(filteredItems);
  };

  const onSubmitHandler = async () => {
    if (onSubmit) {
      setSelectedUserTags(changeTags);
      setSelectedUserLocation(selectedUserLocationValue);
      if (!selectedUserLocation) {
        // 첫 설정일 때
        closeModal(LanguageEditModal);
        closeModal(LocationEditModal);
        navigate('/welcome');
      }
      onClose && onClose();
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
                isActive={changeTags.map((tag) => tag.name).includes(tag.name)}
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
