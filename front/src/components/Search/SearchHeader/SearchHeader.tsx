import { BsFilterRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Scrollbar } from 'swiper';
import Button from '../../Common/Button/Button';
import SearchTag from '../SearchTag/SearchTag';
import useModals from '../../../hooks/useModals';
import 'swiper/css';
import 'swiper/css/scrollbar';
import SearchFilterModal from '../SearchFilterModal/SearchFilterModal';
import {
  selectedSearchLangTagState,
  selectedSearchTagState,
} from '../../../recoil/atoms/search';
import styles from './SearchHeader.module.scss';

const SearchHeader = () => {
  const { openModal } = useModals();

  const searchLangTags = useRecoilValue(selectedSearchLangTagState);
  const searchTags = useRecoilValue(selectedSearchTagState);

  const openLangFilterModal = () => {
    console.log('언어 필터');
  };
  // 자신의 언어, 태그 정보를 가져와야한다.

  const openFilterModalHandler = () => {
    openModal(SearchFilterModal);
  };

  return (
    <header>
      <h2 className={styles.title}>
        관심 있는 태그와 <br />
        언어를 설정해주세요.
      </h2>
      <div className={styles.wrapper}>
        <Button
          variant="primary"
          size="md"
          className={styles.button_wrapper}
          onClick={openFilterModalHandler}
        >
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
            spaceBetween={10}
            slidesPerView={'auto'}
            scrollbar={{
              draggable: true,
            }}
          >
            {/* Language */}
            {searchLangTags.map((tag) => (
              <SwiperSlide key={tag.languageId} className={styles.swiper_slide}>
                <SearchTag type="lang" tag={tag.name} />
              </SwiperSlide>
            ))}

            {/* Tags */}
            {searchTags.map((tag) => (
              <SwiperSlide key={tag.tagId} className={styles.swiper_slide}>
                <SearchTag type="default" tag={tag.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </header>
  );
};

export default SearchHeader;
