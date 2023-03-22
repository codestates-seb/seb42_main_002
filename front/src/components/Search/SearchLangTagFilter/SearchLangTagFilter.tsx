import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { languageTags } from '../../../dummy/languages';
import { selectedSearchLangTagState } from '../../../recoil/atoms/search';
import { LanguageDataType } from '../../../utils';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchInput from '../../Common/SearchInput/SearchInput';

const SearchLangTagFilter = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [searchTags, setSearchTags] = useRecoilState(
    selectedSearchLangTagState
  );

  const [languageList, setLanguageList] = useState([...languageTags]);

  // 수정 전 임시 태그 데이터
  const [tempTagList, setTempTagList] =
    useState<LanguageDataType[]>(searchTags);

  // 태그 선택
  const onSelectTagHandler = (selectedTag: LanguageDataType) => {
    if (
      !tempTagList.map((tag) => tag.languageId).includes(selectedTag.languageId)
    ) {
      setTempTagList((currentState) => [...currentState, selectedTag]);
    } else {
      setTempTagList(
        tempTagList.filter((tag) => tag.languageId !== selectedTag.languageId)
      );
    }
  };

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: any) => {
    setLanguageList(filteredItems);
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
        items={languageTags}
        filterKey="filterTag"
        filterHandler={onChangeSearchInputHandler}
      />
      <Flex gap="sm" wrap="wrap">
        {languageList &&
          languageList.map((tag) => (
            <Flex.Col key={tag.name} cols={6}>
              <LabelButton
                full
                onClick={() => onSelectTagHandler(tag)}
                isActive={tempTagList
                  .map((tag) => tag.languageId)
                  .includes(tag.languageId)}
              >
                <LabelButton.Content>{tag.name}</LabelButton.Content>
              </LabelButton>
            </Flex.Col>
          ))}
      </Flex>
    </FullPageModal>
  );
};

export default SearchLangTagFilter;
