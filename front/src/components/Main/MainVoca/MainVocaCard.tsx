import { useRecoilValue } from 'recoil';
import { randomVocaSelector } from '../../../recoil/selectors/voca';
import Button from '../../Common/Button/Button';
import styles from './MainVocaCard.module.scss';

const MainVocaCard = () => {
  const vocabs = useRecoilValue(randomVocaSelector);

  if (!vocabs) {
    return (
      <div className={styles.empty}>
        <p>단어를 등록해주세요</p>
        <Button variant="dashed" size="sm" to="/voca">
          단어 추가
        </Button>
      </div>
    );
  }

  return (
    <>
      {vocabs && (
        <div className={styles.card}>
          <h3>{vocabs?.word}</h3>
          <p>{vocabs?.meaning}</p>
        </div>
      )}
    </>
  );
};

export default MainVocaCard;
