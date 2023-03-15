import classNames from 'classnames';
import { DefaultProps } from '../../../utils';
import styles from './ProfileBaseInfo.module.scss';

const ProfileBaseImageArea = ({ children, className }: DefaultProps) => {
  return (
    <div className={classNames(styles.img_area, className)}>{children}</div>
  );
};

const ProfileBaseInfoArea = ({ children, className }: DefaultProps) => {
  return (
    <div className={classNames(styles.info_area, className)}>{children}</div>
  );
};

const ProfileBaseInfoWrapper = ({ children, className }: DefaultProps) => {
  return (
    <section className={classNames(styles.base_info, className)}>
      {children}
    </section>
  );
};

const ProfileBaseInfo = Object.assign(ProfileBaseInfoWrapper, {
  ImageArea: ProfileBaseImageArea,
  InfoArea: ProfileBaseInfoArea,
});

export default ProfileBaseInfo;
