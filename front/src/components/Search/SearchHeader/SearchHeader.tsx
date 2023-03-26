import { BsFilterRight } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRecoilValue } from 'recoil';
import { Scrollbar } from 'swiper';
import Button from '../../Common/Button/Button';
import SearchTag from '../SearchTag/SearchTag';
import useModals from '../../../hooks/useModals';
import SearchFilterModal from '../SearchFilterModal/SearchFilterModal';
import {
  selectedSearchLangTagState,
  selectedSearchTagState,
} from '../../../recoil/atoms/search';
import SummaryTitle from '../../Common/SummaryTitle/SummaryTitle';
import { TagDataType } from '../../../utils/types/tags/tags';
import styles from './SearchHeader.module.scss';

const SearchHeader = () => {
  const { openModal } = useModals();

  const searchLangTags = useRecoilValue(selectedSearchLangTagState);
  const searchTags = useRecoilValue(selectedSearchTagState);

  const openFilterModalHandler = () => {
    openModal(SearchFilterModal);
  };

  return (
    <header>
      <SummaryTitle>
        관심 있는 언어와
        <br />
        태그를 선택하세요
        <div className={styles.sub_info}>반드시 하나 이상 선택해야합니다.</div>
      </SummaryTitle>
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
                <SearchTag type="lang" tag={tag.nation} />
              </SwiperSlide>
            ))}

            {/* Tags */}
            {searchTags &&
              searchTags.map((tag: TagDataType) => (
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
