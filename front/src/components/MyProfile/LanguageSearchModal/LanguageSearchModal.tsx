import { useState } from 'react';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import LanguageSearchList from './LanguageSearchList';
import SearchInput from '../../Common/SearchInput/SearchInput';
import { languageTags } from '../../../dummy/languages';
import { LangTagDataType } from '../../../utils/types/tags/tags';

const LanguageSearchModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [languageList, setLanguageList] = useState([...languageTags]);

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: LangTagDataType[]) => {
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
