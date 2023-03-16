import { BsFilterRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper';
import Button from '../../Common/Button/Button';
import SearchTag from '../SearchTag/SearchTag';
import 'swiper/css';
import 'swiper/css/scrollbar';
import styles from './SearchHeader.module.scss';

const SearchHeader = () => {
  return (
    <header>
      <h2 className={styles.title}>
        관심 있는 태그와 <br />
        언어를 설정해주세요.
      </h2>
      <div className={styles.wrapper}>
        <Button variant="primary" size="md" className={styles.button_wrapper}>
          <div className={styles.button}>
            <span className={styles.text}>검색 필터</span>
            <BsFilterRight size={'1.5rem'} />
          </div>
        </Button>
        {/* Swiper */}
        <div className={styles.tags}>
          <Swiper
            className={styles.swiper}
            modules={[Scrollbar]}
            spaceBetween={16}
            slidesPerView={4}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="lang" tag={'일본어'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="lang" tag={'중국어'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="lang" tag={'한국어'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="default" tag={'어쩌구저쩌구'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="default" tag={'게임'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="default" tag={'게임'} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiper_slide}>
              <SearchTag type="default" tag={'게임'} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
