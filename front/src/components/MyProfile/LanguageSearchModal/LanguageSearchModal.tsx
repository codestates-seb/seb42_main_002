import { useState } from 'react';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import LanguageSearchList from './LanguageSearchList';
import SearchInput from '../../Common/SearchInput/SearchInput';
import { languageTags } from '../../../dummy/Tags';

const LanguageSearchModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [languageList, setLanguageList] = useState([...languageTags]);

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: any) => {
    setLanguageList(filteredItems);
  };

  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} noFooter>
      <SearchInput
        items={languageTags}
        filterKey="filterTag"
        filterHandler={onChangeSearchInputHandler}
      />
      <LanguageSearchList languages={languageList}></LanguageSearchList>
    </FullPageModal>
  );
};
export default LanguageSearchModal;
