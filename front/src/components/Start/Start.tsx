import { useEffect } from 'react';
import useModals from '../../hooks/useModals';
import Button from '../../components/Common/Button/Button';
import LocationEditModal from '../../components/MyProfile/LocationEditModal/LocationEditModal';
import styles from './Start.module.scss';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';

const Start = () => {
  const { openModal } = useModals();
  const userInfo = useRecoilValue(userState);
  useEffect(() => {
    if (!userInfo.location) {
      openModal(LocationEditModal);
    }
  }, [userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>
          추가 프로필을 설정해주세요
          <br />
          나와 관심사가 비슷한 친구들을
          <br />
          매칭해드립니다
        </h2>
        <Button
          size="lg"
          variant="primary"
          onClick={() => openModal(LocationEditModal)}
        >
          설정하기
        </Button>
      </div>
    </div>
  );
};

export default Start;
