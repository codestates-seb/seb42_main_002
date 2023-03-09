import styles from './MainVocaCard.module.scss';

const MainVocaCard = () => {
  return (
    <div className={styles.card}>
      <h3>Apple</h3>
      <p>
        an apple pie
        <br />
        사과[애플]파이
      </p>
    </div>
  );
};

export default MainVocaCard;
