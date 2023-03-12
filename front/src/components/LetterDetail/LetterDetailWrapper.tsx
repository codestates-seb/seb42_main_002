import LetterContent from './LetterContent/LetterContent';
import LetterPictureWrapper from './LetterPicture/LetterPictureWrapper';
import Button from '../Common/Button/Button';

import { SeletedLetterData } from '../../utils';
import { seletedLetter } from '../../dummy/letter';

// Import Swiper styles
import 'swiper/css';
import styles from './LetterDetailWrapper.module.scss';

// 임시 타입
type LetterDetailWrapperProps = SeletedLetterData;

const LetterDetailWrapper = () => {
  // 파파고 번역 기능
  const translateHandler = () => {
    console.log('번역중...');
  };

  // 사진 확대 핸들러
  const pictureClickHandler = (pic: string) => {
    console.log('사진 확대', pic);
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
        receiver={seletedLetter.receiver}
        body={seletedLetter.body}
        // 임의
        type="1"
      />
      {/* 편지 사진 */}
      <LetterPictureWrapper
        pictures={seletedLetter.pic}
        onClick={pictureClickHandler}
      />

      {/* 답장 */}
      <Button variant="primary" size="lg" full to="/newletter">
        답장하기
      </Button>
    </div>
  );
};

export default LetterDetailWrapper;
