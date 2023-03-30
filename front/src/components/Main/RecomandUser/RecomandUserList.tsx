import { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import RecomandUserListItem from './RecomandUserListItem';
import Button from '../../Common/Button/Button';
import { recomandUserSelector } from '../../../recoil/selectors/user/user';
import styles from './RecomandUserList.module.scss';

const RecomandUserList = () => {
  const recomandUserList = useRecoilValue(recomandUserSelector);
  const reset = useRecoilRefresher_UNSTABLE(recomandUserSelector);

  useEffect(() => {
    reset();
  }, []);

  if (!recomandUserList.length) {
    return (
      <div className={styles.empty}>
        <p>언어 및 관심사 태그를 설정해주세요</p>
        <Button variant="dashed" size="sm" to="/my-profile">
          프로필 설정
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.recomand_user}>
      {recomandUserList.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={16}
          slidesPerView={'auto'}
          scrollbar={{ draggable: true }}
          className={styles.swiper_list}
        >
          {recomandUserList.map((user: any) => (
            <SwiperSlide key={user.memberId} className={styles.swiper_slide}>
              <RecomandUserListItem
                profile={user.profile}
                name={user.name}
                memberId={user.memberId}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default RecomandUserList;
