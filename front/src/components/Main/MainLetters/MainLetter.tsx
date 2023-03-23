import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import waiting_owl from '../../../assets/img/main/main_waiting_owls.svg';
import { GET } from '../../../utils/axios';
import styles from './MainLetter.module.scss';

const MainLetter = () => {
  const [arrivedLetterCount, setArrivedLetterCount] = useState(0);

  const getArrivedLetterCount = async () => {
    try {
      const { data, status } = await GET('/users/me/letters/arrived');
      if (status === 200 && data) {
        setArrivedLetterCount(data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArrivedLetterCount();
  }, []);

  if (!arrivedLetterCount) {
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
            도착한 편지 <span>{arrivedLetterCount}</span>건
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MainLetter;
