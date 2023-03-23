import defaultProfile from '../../../assets/img/default_owls_thumb.svg';
import { LocationIcons, locationTypes } from '../../../utils';
import { LOCATION_CODE } from '../../../utils/enums/common/common.enum';
import styles from './RoundProfile.module.scss';

type RoundProfileProps = {
  location: LOCATION_CODE; // 2자 국가 코드
  profile: string | null;
};

const RoundProfile = ({ location, profile }: RoundProfileProps) => {
  // 문제) 해당 유저의 국가 정보를 받아서 inline으로 CSS수정
  return (
    <div className={styles.round_profile}>
      <div
        style={{
          backgroundImage: `url(${
            LocationIcons[location as keyof locationTypes]
          })`,
        }}
        className={styles.location}
      ></div>
      <div className={styles.profile}>
        {profile && <img src={profile} alt="프로필" />}
        {!profile && (
          <img
            className={styles.default_profile}
            src={defaultProfile}
            alt="프로필"
          />
        )}
      </div>
    </div>
  );
};

export default RoundProfile;
