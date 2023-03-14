import classNames from 'classnames';
import defaultProfile from '../../../assets/img/default_owls_thumb.svg';
import { LOCATION_CODE } from '../../../utils/enums/common/common.enum';
import styles from './ProfileImage.module.scss';

type ProfileImageProps = {
  profile?: string | undefined | null;
  location?: string | LOCATION_CODE | null;
};

type locationTypes = {
  KR: LOCATION_CODE;
  JP: LOCATION_CODE;
  CN: LOCATION_CODE;
  US: LOCATION_CODE;
  ES: LOCATION_CODE;
};

const LOCATIONS = {
  KR: styles.KR,
  JP: styles.JP,
  CN: styles.CN,
  US: styles.US,
  ES: styles.ES,
};

const ProfileImage = ({ profile, location }: ProfileImageProps) => {
  return (
    <div className={styles.profile_img_wrapper}>
      <div className={styles.profile_img}>
        {location && (
          <span
            className={classNames(
              styles.icon_flags,
              LOCATIONS[location as keyof locationTypes]
            )}
          ></span>
        )}
        <figure className={styles.default_profile}>
          {profile && <img src={profile} alt="" />}
          {!profile && <img src={defaultProfile} alt="프로필" />}
        </figure>
      </div>
    </div>
  );
};

export default ProfileImage;
