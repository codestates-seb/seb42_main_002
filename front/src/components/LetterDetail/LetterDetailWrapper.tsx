import LetterContent from './LetterContent/LetterContent';
import LetterPicture from './LetterPicture/LetterPicture';
import Button from '../Common/Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';

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
      <div className={styles.pictures}>
        <Swiper spaceBetween={0} slidesPerView={4} className={styles.swiper}>
          {/* 이미지 key을 어떤 값으로 변경할지 */}
          {seletedLetter.pic.length > 0 &&
            seletedLetter.pic.map((picture, idx) => (
              <SwiperSlide key={picture}>
                <LetterPicture pic={picture} rotate={idx} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* 답장 */}
      <Button variant="primary" size="lg" full to="/newletter">
        답장하기
      </Button>
    </div>
  );
};

export default LetterDetailWrapper;
