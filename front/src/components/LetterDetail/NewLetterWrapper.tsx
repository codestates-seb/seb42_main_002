import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useModals from '../../hooks/useModals';
import { letterTypeState, newLetterState } from '../../recoil/atoms';
import { newLetterType, toast } from '../../utils';
import { POST, POST_IMG } from '../../utils/axios';
import Button from '../Common/Button/Button';
import AlertModal, { AlertModalProps } from '../Common/Modal/AlertModal';
import NewLetterContent from './LetterContent/NewLetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import LetterType from './LetterType/LetterType';

const NewLetterWrapper = () => {
  const { openModal } = useModals();
  const [newLetter, setNewLetter] = useRecoilState(newLetterState);
  const selectedLetterType = useRecoilValue(letterTypeState);
  const navigate = useNavigate();

  /**
   * @description 새 편지 등록 API
   */
  const postNewLetter = async (letter: newLetterType) => {
    try {
      const response = await POST(`/users/me/letters`, {
        body: letter.body,
        type: selectedLetterType,
        receiver: letter.memberId,
      });
      const location =
        response.headers.location && response.headers.location.split('/');

      // 편지 내용 초기화
      setNewLetter((prev) => ({
        ...prev,
        body: '',
        photoUrl: [],
      }));

      if (location[2]) {
        navigate(`/letters/${newLetter.memberId}/${location[2]}`);
      } else {
        navigate(`/letters/${newLetter.memberId}`);
      }
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  // TODO : 이미지 삭제 시, 모달로 확인하기?
  const pictureRemoveHandler = (idx: number) => {
    const removedPhotoArr = newLetter.photoUrl.filter(
      (_, photoIdx) => photoIdx !== idx
    );
    setNewLetter((prev) => ({
      ...prev,
      photoUrl: removedPhotoArr,
    }));
  };

  const pictureAddHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    const formData = new FormData();
    formData.append('type', 'photos');
    file && formData.append('image', file);
    try {
      const { data } = await POST_IMG(
        '/users/me/letters/photos/upload',
        formData,
        {
          headers: {
            'Contest-Type': 'multipart/form-data',
          },
        }
      );
      setNewLetter((prev) => ({
        ...prev,
        photoUrl: [...prev.photoUrl, data.uploadUrl],
      }));
    } catch (error) {
      console.log('error');
    }
  };

  const confirmSendLetterModal = ({ onSubmit, onClose }: AlertModalProps) => {
    const onSubmitHandler = () => {
      postNewLetter(newLetter);
      onSubmit && onSubmit();
    };

    return (
      <>
        <AlertModal
          labelClose="닫기"
          labelSubmit="확인"
          onSubmit={onSubmitHandler}
          onClose={onClose}
        >
          편지를 정말 보내시겠습니까?
        </AlertModal>
      </>
    );
  };

  const confirmSendLetterModalHandler = () => {
    // 유효성 검사
    if (!newLetter.body.trim()) {
      toast.error('편지 내용을 입력해 주세요');
      return;
    }
    openModal(confirmSendLetterModal);
  };

  return (
    <>
      {/* 편지지 선택 */}
      <LetterType />
      {/* 편지 내용 */}
      <NewLetterContent receiver={newLetter.receiver} type={newLetter.type} />
      {/* 이미지 선택 */}
      <LetterPictureWrapper
        pictures={newLetter.photoUrl}
        onRemove={pictureRemoveHandler}
        onAdd={pictureAddHandler}
        isRead={false}
      />
      {/* 편지 보내기 */}
      <Button
        variant="primary"
        size="lg"
        full
        onClick={confirmSendLetterModalHandler}
      >
        편지 보내기
      </Button>
    </>
  );
};

export default NewLetterWrapper;
