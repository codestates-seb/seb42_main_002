import { useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import { userLanguageState } from '../../../recoil/atoms/user/userLanguage';
import Button from '../../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import LanguageSearchModal from '../LanguageSearchModal/LanguageSearchModal';
import LanguageList from './LanguageList';

/**
 * 언어 레벨 수정 / 언어 삭제 / 언어 추가 모들
 * @param
 * @returns
 */
const LanguageEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const { openModal } = useModals();
  const selectedUserLanguages = useRecoilValue(userLanguageState);

  const onClickLanguageSearchModalHandler = () => {
    openModal(LanguageSearchModal);
  };

  return (
    <FullPageModal
      onSubmit={onSubmit}
      onClose={onClose}
      labelSubmit="수정"
      noFooter
    >
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
