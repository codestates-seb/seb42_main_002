import { useState } from 'react';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import TagSearchBar from '../../Common/Tags/TagSearchBar';
import { languageTags } from '../../../dummy/Tags';
import {
  CONST_LANGUAGE_CODE,
  LANGUAGE_CODE,
} from '../../../utils/enums/common/common.enum';
import LanguageSearchList from './LanguageSearchList';
import { UserData } from '../../../utils';

const LanguageSearchModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [languageList, setLanguageList] = useState<LANGUAGE_CODE[]>([
    ...CONST_LANGUAGE_CODE,
  ]);
  // const { selectedLanguage } = useSelector(
  //   (state: { user: UserData }) => state.user
  // );
  // const dispatch = useDispatch();

  // TODO : 버그 수정
  const onSubmitHandler = () => {
    if (onSubmit) {
      // if (selectedLanguage) {
      //   dispatch({
      //     type: 'ADD_LANGUAGE',
      //     payload: selectedLanguage,
      //   });
      // }
      // if (onClose) {
      //   onClose();
      // }
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit="수정"
    >
      <LanguageSearchList languages={languageList}></LanguageSearchList>
    </FullPageModal>
  );
};
export default LanguageSearchModal;
