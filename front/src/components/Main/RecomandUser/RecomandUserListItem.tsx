import React from 'react';
import {Link} from 'react-router-dom';
import defaultOwl from '../../../assets/img/default_owls_thumb.svg';
import styles from './RecomandUserListItem.module.scss';

type RecomandUserListItemProps = {
  memberId: number;
  profile?: string | null;
};

const RecomandUserListItem = ({
  memberId,
  profile,
}: RecomandUserListItemProps) => {
  return (
    <div className={styles.item}>
      <Link to={`/profile/${memberId}`}>
        <figure>
          {profile ? (
            <img src={profile} alt={`${memberId} profile`} />
          ) : (
            <img src={defaultOwl} alt={`${memberId} profile`} />
          )}
        </figure>
      </Link>
    </div>
  );
};

export default RecomandUserListItem;
