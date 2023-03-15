import classNames from 'classnames';
import defaultProfile from '../../../assets/img/default_owls_thumb.svg';
import { LocationIcons, locationTypes } from '../../../utils';
import { locationTransformer } from '../../../utils/common';
import { LOCATION_CODE } from '../../../utils/enums/common/common.enum';
import styles from './ProfileImage.module.scss';

type ProfileImageProps = {
  profile?: string | undefined | null;
  location?: string | LOCATION_CODE | undefined | null;
  onChangeLocation?: () => void;
};

const ProfileImage = ({
  profile,
  location,
  onChangeLocation,
}: ProfileImageProps) => {
  return (
    <div className={styles.profile_img_wrapper}>
      <div className={styles.profile_img}>
        {!onChangeLocation ? (
          <span className={classNames(styles.icon_flags)}>
            <img
              src={LocationIcons[location as keyof locationTypes]}
              alt={`${locationTransformer(location as LOCATION_CODE)} 국기`}
            />
          </span>
        ) : (
          <button
            className={classNames(styles.icon_flags)}
            onClick={onChangeLocation}
          >
            <img
              src={LocationIcons[location as keyof locationTypes]}
              alt={`${locationTransformer(location as LOCATION_CODE)} 국기`}
            />
          </button>
        )}
        <figure className={classNames({ [styles.default_profile]: !profile })}>
          {profile && <img src={profile} alt="프로필 이미지" />}
          {!profile && <img src={defaultProfile} alt="프로필 기본 이미지" />}
        </figure>
      </div>
    </div>
  );
};

export default ProfileImage;
