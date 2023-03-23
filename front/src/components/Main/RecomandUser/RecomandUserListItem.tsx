import React from 'react';
import { Link } from 'react-router-dom';
import defaultOwl from '../../../assets/img/common/default_owls_thumb.svg';
import { onErrorImage } from '../../../utils';
import styles from './RecomandUserListItem.module.scss';

type RecomandUserListItemProps = {
  memberId: number;
  name: string;
  profile?: string | null;
};

const RecomandUserListItem = ({
  memberId,
  name,
  profile,
}: RecomandUserListItemProps) => {
  return (
    <div className={styles.item}>
      <Link to={`/profile/${memberId}`}>
        <figure>
          {profile ? (
            <img
              src={profile}
              alt={`${name}님 프로필 이미지`}
              title={`${name} 프로필`}
              onError={onErrorImage}
            />
          ) : (
            <img
              src={defaultOwl}
              alt={`${name}님 프로필 이미지`}
              title={`${name}`}
              onError={onErrorImage}
            />
          )}
        </figure>
        <span className={styles.name}>{name}</span>
      </Link>
    </div>
  );
};

export default RecomandUserListItem;
