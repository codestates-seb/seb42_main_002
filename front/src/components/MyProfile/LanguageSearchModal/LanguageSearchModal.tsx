import { useState } from 'react';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import LanguageSearchList from './LanguageSearchList';
import SearchInput from '../../Common/SearchInput/SearchInput';
import { LangTagDataType } from '../../../utils/types/tags/tags';
import { allLanguageState } from '../../../recoil/selectors';
import { useRecoilValue } from 'recoil';

const LanguageSearchModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const languages = useRecoilValue(allLanguageState);
  const [languageList, setLanguageList] = useState([...languages]);

  // 태그 검색
  const onChangeSearchInputHandler = (filteredItems: LangTagDataType[]) => {
    setLanguageList(filteredItems);
  };

  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} noFooter>
      <SearchInput
        items={languages}
        filterKey="filterTag"
        filterHandler={onChangeSearchInputHandler}
      />
      <LanguageSearchList languages={languageList}></LanguageSearchList>
    </FullPageModal>
  );
};
export default LanguageSearchModal;
