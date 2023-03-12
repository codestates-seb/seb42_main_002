import LetterPicture from '../LetterPicture/LetterPicture';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './LetterPictureWrapper.module.scss';
import 'swiper/css';

type LetterPictureWrapperProps = {
  pictures: string[];
  onClick: (pic: string) => void;
};

const LetterPictureWrapper = ({
  pictures,
  onClick,
}: LetterPictureWrapperProps) => {
  return (
    <div className={styles.pictures}>
      <Swiper spaceBetween={0} slidesPerView={4} className={styles.swiper}>
        {/* 이미지 key을 어떤 값으로 변경할지 */}
        {pictures.length > 0 &&
          pictures.map((picture, idx) => (
            <SwiperSlide key={picture}>
              <LetterPicture pic={picture} rotate={idx} onClick={onClick} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default LetterPictureWrapper;
