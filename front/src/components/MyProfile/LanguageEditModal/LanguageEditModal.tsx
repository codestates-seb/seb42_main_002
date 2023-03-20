import { useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import { userLocationState } from '../../../recoil/atoms';
import { userLanguageState } from '../../../recoil/atoms/user/userLanguage';
import { PATCH } from '../../../utils/axios';
import Button from '../../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SummaryTitle from '../../Common/SummaryTitle/SummaryTitle';
import LanguageSearchModal from '../LanguageSearchModal/LanguageSearchModal';
import TagEditModal from '../TagEditModal/TagEditModal';
import LanguageList from './LanguageList';

/**
 * 언어 레벨 수정 / 언어 삭제 / 언어 추가 모들
 * @param
 * @returns
 */
const LanguageEditModal = ({ onClose }: FullPageModalProps) => {
  const { openModal } = useModals();
  const selectedUserLanguages = useRecoilValue(userLanguageState);
  const selectedUserLocation = useRecoilValue(userLocationState);

  const onClickLanguageSearchModalHandler = () => {
    openModal(LanguageSearchModal);
  };

  const onSubmitHandler = () => {
    if (!selectedUserLocation) {
      // 첫 설정일 때
      openModal(TagEditModal);
    } else {
      // 수정일 때
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit={!selectedUserLocation ? '다음' : '닫기'}
    >
      {!selectedUserLocation && (
        <SummaryTitle>
          배우고싶거나
          <br />
          관심있는 언어를 선택하세요
        </SummaryTitle>
      )}
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
