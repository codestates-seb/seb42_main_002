import React from 'react';
import styles from './MainLetter.module.scss';
import waiting_owl from '../../../assets/img/main_waiting_owls.svg';
import { mainLetterData } from '../../../dummy/main-letters';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const MainLetter = () => {
  if (!mainLetterData.count) {
    return (
      <Link to="/letters">
        <div className={styles.container}>
          <div className={styles.envelope}>
            <img src={waiting_owl} alt="편지 대기중인 부엉이" />
            <p>아직 도착한 편지가 없습니다</p>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to="/letters">
      <div className={classNames(styles.container, styles.is_arrived)}>
        <div className={styles.envelope}>
          <div className={styles.envelope_cover} />
          <div className={styles.envelope_letter}>
            <div className={styles.envelope_card}></div>
          </div>
          <p>
            도착한 편지 <span>{mainLetterData.count}</span>건
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MainLetter;
