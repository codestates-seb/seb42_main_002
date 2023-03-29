import useModals from '../../hooks/useModals';
import Button from '../../components/Common/Button/Button';
import LocationEditModal from '../../components/MyProfile/LocationEditModal/LocationEditModal';
import { ReactComponent as OwlsFriends } from '../../assets/img/common/owls_friends.svg';
import styles from './Start.module.scss';

const Start = () => {
  const { openModal } = useModals();

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.owls_container}>
          <OwlsFriends />
        </div>
        <div className={styles.text_container}>
          <h2 className={styles.title}>새로운 친구를 만날 준비가 되었나요</h2>
          <p className={styles.body}>
            추가 프로필을 설정해주세요
            <br />
            나와 관심사가 비슷한 친구들을 매칭해드립니다
          </p>
        </div>

        <div className={styles.btn_wrap}>
          <Button
            size="lg"
            variant="primary"
            onClick={() => openModal(LocationEditModal)}
            full
          >
            설정하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Start;
