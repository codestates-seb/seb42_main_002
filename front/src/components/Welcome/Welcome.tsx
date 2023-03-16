import { ReactComponent as Cloud } from '../../assets/profile_completed/cloud.svg';
import { ReactComponent as Fly_owl } from '../../assets/profile_completed/fly_owl.svg';
import { ReactComponent as Stamp } from '../../assets/profile_completed/stamp.svg';
import Button from '../Common/Button/Button';
import styles from './Welcome.module.scss';

export default function Welcom() {
  return (
    <div className={styles.profile_completed_container}>
      <Stamp className={styles.stamp_icon} />
      <div className={styles.fly_owl_container}>
        <Fly_owl />
        <Cloud className={styles.cloud_1} />
        <Cloud className={styles.cloud_2} />
      </div>
      <div className={styles.text_container}>
        <p className={styles.text_Head}>세상과 마음을 나누세요</p>
        <p className={styles.text_body}>
          공통 관심사와 언어를 바탕으로 매칭이 진행됩니다
        </p>
        <p className={styles.text_body}>
          새 펜팔에게 첫 편지를 부칠 준비가 되셨나요?
        </p>
      </div>
      <Button
        variant="primary"
        size="lg"
        className={styles.start_btn}
        full={true}
        to="/main"
      >
        시작하기
      </Button>
    </div>
  );
}
