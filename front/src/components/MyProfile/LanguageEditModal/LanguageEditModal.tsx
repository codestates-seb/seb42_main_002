import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import useModals from '../../../hooks/useModals';
import {userLanguageState} from '../../../recoil/atoms/user/userLanguage';
import Button from '../../Common/Button/Button';
import FullPageModal, {FullPageModalProps,} from '../../Common/Modal/FullPageModal';
import LanguageSearchModal from '../LanguageSearchModal/LanguageSearchModal';
import LanguageList from './LanguageList';

const LanguageEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const { openModal } = useModals();

  const [selectedUserLanguages, setSelectedUserLanguages] =
    useRecoilState(userLanguageState);
  const [selectedLangauge, setSelectedLanguage] = useState({});

  useEffect(() => {
    if (selectedLangauge) {
      setSelectedLanguage(selectedUserLanguages);
    }
  }, [selectedLangauge]);

  const onClickLanguageSearchModalHandler = () => {
    openModal(LanguageSearchModal, {
      onSubmit: () => {
        console.log(selectedUserLanguages);
      },
    });
  };

  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      <Button
        size="lg"
        variant="dashed"
        full
        onClick={onClickLanguageSearchModalHandler}
      >
        + 언어 추가
      </Button>
      {selectedUserLanguages && (
        <LanguageList languages={selectedUserLanguages} />
      )}
    </FullPageModal>
  );
};
export default LanguageEditModal;
