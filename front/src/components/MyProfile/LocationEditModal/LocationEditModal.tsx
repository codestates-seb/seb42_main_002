import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      국가 수정 모달
    </FullPageModal>
  );
};

export default LocationEditModal;
