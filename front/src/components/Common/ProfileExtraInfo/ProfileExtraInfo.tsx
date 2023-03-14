import classNames from 'classnames';
import { DefaultProps } from '../../../utils';
import styles from './ProfileExtraInfo.module.scss';

const ProfileExtraInfo = ({ children, className }: DefaultProps) => {
  return (
    <section
      className={classNames(styles.extra_info, styles[className as string])}
    >
      {children}
    </section>
  );
};

export default ProfileExtraInfo;
