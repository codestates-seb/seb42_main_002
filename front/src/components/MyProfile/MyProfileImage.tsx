import classNames from 'classnames';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { UserData } from '../../utils';
import { LOCATION_CODE } from '../../utils/enums/common/common.enum';
import styles from './MyProfileImage.module.scss';

type MyProfileImage = {
  onChangeLocation: () => void;
};

type locationTypes = {
  KR: LOCATION_CODE;
};

const LOCATIONS = {
  KR: styles.KR,
};

const MyProfileImage = ({ onChangeLocation }: MyProfileImage) => {
  const { location } = useRecoilValue(userState);
  // TODO : 이미지 미리보기 로직 수정 필요
  const [thumnail, setThumnail] = useState<string | null>('');

  const clickChangeThumbnailHandler = (event: any) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setThumnail(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={styles.profile_img}>
      <figure>
        {location && (
          <button
            className={classNames(
              styles.icon_flags,
              LOCATIONS[location as keyof locationTypes]
            )}
            onClick={onChangeLocation}
          ></button>
        )}
        {thumnail && <img src={thumnail} alt="" />}
      </figure>
      <label htmlFor="profile">사진 수정</label>
      <input
        type="file"
        id="profile"
        className="blind"
        accept="image/*"
        onChange={clickChangeThumbnailHandler}
      />
    </div>
  );
};

export default MyProfileImage;
