import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import {
  userLanguageState,
  userLocationState,
  userLocationValueState,
  userState,
  userTagState,
} from '../../../recoil/atoms';
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
  const { closeModal } = useModals();
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userState);
  const hobbyTags = useRecoilValue(allTagState); // 취미 전체 목록
  const selectedUserLangauges = useRecoilValue(userLanguageState); // 선택한 언어
  const selectedUserLocationValue = useRecoilValue(userLocationValueState); // 첫 설정시 국가
  const [selectedUserTags, setSelectedUserTags] =
    useRecoilState<TagDataType[]>(userTagState);
  const [changeTags, setChangeTags] = useState<TagDataType[]>([
    ...selectedUserTags,
  ]);
  const [selectedUserLocation, setSelectedUserLocation] =
    useRecoilState(userLocationState);
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

  const updateTag = async () => {
    try {
      const requestData = changeTags.map((tag) => tag.name);
      const response = await PATCH('/members', {
        tag: requestData,
      });
      if (response) {
        setSelectedUserTags(changeTags);
        console.log('태그 설정 완료');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLocation = async () => {
    try {
      const response = await PATCH('/members', {
        location: selectedUserLocationValue,
      });
      if (response) {
        setSelectedUserLocation(selectedUserLocationValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLanguage = async () => {
    try {
      const response = await PATCH('/members', {
        language: selectedUserLangauges,
      });
      if (response) {
        toast.success('설정 완료되었습니다!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async () => {
    if (onSubmit) {
      if (userInfo?.location === null) {
        // 첫 설정 일때
        Promise.all([updateLocation(), updateLanguage(), updateTag()])
          .then((res) => {
            if (res) {
              toast.success('설정 완료되었습니다!');
            }
          })
          .catch((error) => console.error(error));
        // 첫 설정 후 전체 모달 닫고 Welcome 페이지로 이동
        closeModal(LocationEditModal);
        closeModal(LanguageEditModal);
        navigate('/welcome');
      } else {
        // 수정 일때
        updateTag();
        toast.success('수정 완료되었습니다!');
      }
      onClose && onClose();
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit={userInfo?.location === null ? '설정 완료' : '수정'}
    >
      {userInfo?.location === null && (
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
          tagList.map((tag: TagDataType) => (
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
