import React, { useState } from 'react';
import styles from './MyProfileImage.module.scss';

const MyProfileImage = () => {
  // TODO : 이미지 미리보기 로직 수정 필요
  const [thumnail, setThumnail] = useState<string | null>('');

  const clickChangeThumbnailHandler = (event: any) => {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      console.log(event.target);
      setThumnail(event.target.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={styles.profile_img}>
      <figure>
        <span className={styles.icon_flags}></span>
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
