import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedLetterState, selectedPictureIdx } from '../../recoil/atoms';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET } from '../../utils/axios';
import { SeletedLetterDataType } from '../../utils';
import LetterContent from './LetterContent/LetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import Button from '../Common/Button/Button';
import useModals from '../../hooks/useModals';
import PictureModal from '../PictureModal/PictureModal';

import styles from './LetterDetailWrapper.module.scss';

const LetterDetailWrapper = () => {
  const { openModal } = useModals();
  const { letterId } = useParams();

  const setSelectedPictureIdx = useSetRecoilState(selectedPictureIdx);
  // TODO: 리코일 setter사용 시, 페이지 접속 시 바로 렌더링이 되지않음.
  const [selectedLetter, setSelectedLetter] =
    useRecoilState(selectedLetterState);
  const [letter, setLetter] = useState<SeletedLetterDataType>(selectedLetter);

  /**
   * @description API
   */
  const getDetailLetter = async () => {
    try {
      const { data } = await GET(`/letters/${letterId}`);
      setSelectedLetter(data);
      setLetter(data);
    } catch (error) {
      console.log('error');
      // TODO: ERROR 처리 방법
    }
  };

  useEffect(() => {
    getDetailLetter();
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
        receiver={letter.receiver}
        body={letter.body}
        // 임의
        type="1"
      />
      {/* 편지 사진 */}
      <LetterPictureWrapper
        pictures={letter.photoUrl}
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
