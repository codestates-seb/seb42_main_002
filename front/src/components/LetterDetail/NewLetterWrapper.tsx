import { useRecoilState } from 'recoil';
import { newLetterState } from '../../recoil/atoms';
import Button from '../Common/Button/Button';
import NewLetterContent from './LetterContent/NewLetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import LetterType from './LetterType/LetterType';

const NewLetterWrapper = () => {
  const [newLetter, setNewLetter] = useRecoilState(newLetterState);

  // TODO : 이미지 삭제 시, 모달로 확인하기?
  const pictureRemoveHandler = (idx: number) => {
    console.log('현재 사진 삭제', idx);
    const removedPhotoArr = newLetter.photoUrl.filter(
      (_, photoIdx) => photoIdx !== idx
    );
    setNewLetter((prev) => ({
      ...prev,
      photoUrl: removedPhotoArr,
    }));
  };

  // TODO : 이미지 추가 로직 변경
  const pictureAddHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files && event.target.files[0];

    reader.onload = () => {
      setNewLetter((prev) => ({
        ...prev,
        photoUrl: [...prev.photoUrl, String(reader.result)],
      }));
    };
    file && reader.readAsDataURL(file);
  };

  const onSubmitHandler = () => {
    console.log('편지 제출', newLetter);
  };

  return (
    <>
      {/* 편지지 선택 */}
      <LetterType />
      {/* 편지 내용 */}
      <NewLetterContent receiver="안아영" />
      {/* 이미지 선택 */}
      <LetterPictureWrapper
        pictures={newLetter.photoUrl}
        onRemove={pictureRemoveHandler}
        onAdd={pictureAddHandler}
        isRead={false}
      />
      {/* 편지 보내기 */}
      <Button variant="primary" size="lg" full onClick={onSubmitHandler}>
        편지 보내기
      </Button>
    </>
  );
};

export default NewLetterWrapper;
