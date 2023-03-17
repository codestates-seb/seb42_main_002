import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedLetterState, selectedPictureIdx } from '../../recoil/atoms';
import { useEffect } from 'react';
import LetterContent from './LetterContent/LetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import Button from '../Common/Button/Button';
import useModals from '../../hooks/useModals';
import PictureModal from '../PictureModal/PictureModal';

import { seletedLetter } from '../../dummy/letter';
import styles from './LetterDetailWrapper.module.scss';

const LetterDetailWrapper = () => {
  const { openModal } = useModals();

  const setSelectedPictureIdx = useSetRecoilState(selectedPictureIdx);

  // API 호출 후, 설정하기
  const [selectedLetter, setSelectedLetter] =
    useRecoilState(selectedLetterState);

  useEffect(() => {
    setSelectedLetter(seletedLetter);
  }, []);

  // 파파고 번역 기능
  const translateHandler = () => {
    console.log('번역중...');
  };

  // 사진 확대 핸들러
  const pictureClickHandler = (idx: number) => {
    setSelectedPictureIdx(idx);
    openModal(PictureModal);
  };

  return (
    <div className={styles.wrapper}>
      {/* 파파고 버튼 */}
      <div className={styles.translate}>
        <Button variant="secondary" size="sm" onClick={translateHandler}>
          파파고 번역
        </Button>
      </div>
      {/* 편지 내용 */}
      <LetterContent
        receiver={selectedLetter.receiver}
        body={selectedLetter.body}
        // 임의
        type="1"
      />
      {/* 편지 사진 */}
      <LetterPictureWrapper
        pictures={selectedLetter.photoUrl}
        onClick={pictureClickHandler}
        isRead
      />
      {/* 답장 */}
      {/* 버튼 고민 */}
      <Button variant="primary" size="lg" full to="/newletter">
        답장하기
      </Button>
    </div>
  );
};

export default LetterDetailWrapper;
