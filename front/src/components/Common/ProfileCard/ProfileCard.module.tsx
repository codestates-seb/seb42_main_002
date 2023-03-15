import classNames from 'classnames';
import {DefaultProps} from '../../../utils';
import ProfileBaseInfo from '../ProfileBaseInfo/ProfileBaseInfo';
import ProfileExtraInfo from '../ProfileExtraInfo/ProfileExtraInfo';
import styles from './ProfileCard.module.scss';

const ProfileCardContainer = ({ children, className }: DefaultProps) => {
  return <div className={classNames(styles.card, className)}>{children}</div>;
};

const ProfileCard = Object.assign(ProfileCardContainer, {
  BaseInfo: ProfileBaseInfo,
  ExtraInfo: ProfileExtraInfo,
});

export default ProfileCard;
