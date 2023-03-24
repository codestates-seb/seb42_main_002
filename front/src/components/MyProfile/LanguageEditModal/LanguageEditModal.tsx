import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import useModals from '../../../hooks/useModals';
import { userLocationState, userState } from '../../../recoil/atoms';
import { userLanguageState } from '../../../recoil/atoms/user/userLanguage';
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
  const userInfo = useRecoilValue(userState);
  const selectedUserLanguages = useRecoilValue(userLanguageState);
  const selectedUserLocation = useRecoilValue(userLocationState);

  const onClickLanguageSearchModalHandler = () => {
    openModal(LanguageSearchModal);
  };

  const onSubmitHandler = () => {
    if (selectedUserLanguages.length === 0) {
      toast.error('언어를 하나이상 선택해주세요');
      return;
    }
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
      labelSubmit={userInfo?.location === null ? '다음' : '닫기'}
    >
      {userInfo?.location === null && (
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
