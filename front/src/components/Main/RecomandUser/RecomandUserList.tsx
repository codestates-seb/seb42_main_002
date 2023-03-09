import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { recomandUserData } from '../../../dummy/recomand-users';
import RecomandUserListItem from './RecomandUserListItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './RecomandUserList.module.scss';

const RecomandUserList = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={16}
      slidesPerView={5}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className={styles.swiper_list}
    >
      {recomandUserData.content.map((user) => (
        <SwiperSlide key={user.memberId} className={styles.swiper_slide}>
          <RecomandUserListItem
            profile={user.profile}
            memberId={user.memberId}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecomandUserList;
