import { useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import { selectedLetterState, selectedPictureIdx } from '../../recoil/atoms';
import Button from '../Common/Button/Button';
import { FullPageModalProps } from '../Common/Modal/FullPageModal';
import { ReactComponent as CanceButtonlIcon } from '../../assets/CancelIcon.svg';

import styles from './PictureModal.module.scss';

const PictureModal = ({ onClose }: FullPageModalProps) => {
  const { photoUrl } = useRecoilValue(selectedLetterState);
  const initIdx = useRecoilValue(selectedPictureIdx);

  const onCloseHandler = (event: any) => {
    if (event.target.tagName === 'IMG') return;
    onClose && onClose();
  };

  return (
    <div
      className={styles.modal_back}
      role="presentation"
      onClick={onCloseHandler}
    >
      <div className={styles.modal}>
        <div className={styles.close_button}>
          <Button
            size="sm"
            variant="primary"
            icon={<CanceButtonlIcon />}
            iconBtn
            onClick={onCloseHandler}
          />
        </div>
        <div className={styles.modal_body}>
          <Swiper
            spaceBetween={16}
            slidesPerView={'auto'}
            modules={[Scrollbar]}
            scrollbar={{
              draggable: true,
            }}
            initialSlide={initIdx}
          >
            {photoUrl &&
              photoUrl.length > 0 &&
              photoUrl.map((picture) => (
                <SwiperSlide key={picture} className={styles.swiper_slide}>
                  <div className={styles.img_wrapper}>
                    <img alt="첨부이미지" src={picture} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PictureModal;
