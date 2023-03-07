import styles from './RoundProfile.module.scss';

const RoundProfile = () => {
  // 1. 해당 유저의 국가 정보를 받아서 inline으로 CSS수정
  return (
    <div className={styles.round_profile}>
      <div className={styles.nation}></div>
      <div className={styles.profile}>
        <img
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80"
          alt="프로필"
        />
      </div>
    </div>
  );
};

export default RoundProfile;
