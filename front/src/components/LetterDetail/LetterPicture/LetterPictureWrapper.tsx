import LetterPicture from '../LetterPicture/LetterPicture';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './LetterPictureWrapper.module.scss';
import 'swiper/css';

type LetterPictureWrapperProps = {
  pictures: string[];
  onClick?: (pic: string) => void;
  onRemove?: (idx: number) => void;
  onAdd?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isRead: boolean;
};

const LetterPictureWrapper = ({
  pictures,
  onClick,
  isRead,
  onAdd,
  onRemove,
}: LetterPictureWrapperProps) => {
  return (
    <div className={styles.pictures}>
      <Swiper spaceBetween={0} slidesPerView={4} className={styles.swiper}>
        {/* 이미지 key을 어떤 값으로 변경할지 */}
        {pictures.length > 0 &&
          pictures.map((picture, idx) => (
            <SwiperSlide key={picture}>
              <LetterPicture
                pic={picture}
                rotate={idx}
                onClick={isRead ? onClick : onRemove?.bind(null, idx)}
              />
            </SwiperSlide>
          ))}
        {/* 글쓰기 모드 */}
        {!isRead && (
          <SwiperSlide>
            <LetterPicture pic={''} isAdd rotate={1} onAdd={onAdd} />
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default LetterPictureWrapper;
