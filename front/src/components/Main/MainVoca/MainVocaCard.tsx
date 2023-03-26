import { useState, useEffect } from 'react';
import { GET } from '../../../utils/axios';
import { VocaDataType } from '../../../utils/types/voca';
import Button from '../../Common/Button/Button';
import styles from './MainVocaCard.module.scss';

const MainVocaCard = () => {
  const [vocabs, sestVocabs] = useState<VocaDataType | null>(null);

  const getVocabs = async () => {
    try {
      const { data } = await GET('/vocabs/random');
      if (data) {
        sestVocabs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getVocabs();
  }, []);

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
