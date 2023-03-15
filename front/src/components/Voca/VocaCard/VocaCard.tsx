import {FiTrash2} from 'react-icons/fi';
import {BiEdit} from 'react-icons/bi';

import styles from './VocaCard.module.scss';

type VocaCardProps = {
  word: string;
  vocabId: number;
  meaning: string;
  onEdit: () => void;
  onDelete: (vocabId: number) => void;
};

const VocaCard = ({
  word,
  meaning,
  onEdit,
  onDelete,
  vocabId,
}: VocaCardProps) => {
  return (
    <li className={styles.card}>
      {/* Word */}
      <div className={styles.word}>{word}</div>
      {/* Meaning */}
      <div className={styles.meaning}>{meaning}</div>
      {/* 버튼들 */}
      <div className={styles.buttons}>
        {/* 수정 */}
        <button className={styles.button} onClick={onEdit}>
          <BiEdit size="1.125rem" />
        </button>
        {/* 삭제 */}
        <button
          className={styles.button}
          onClick={onDelete.bind(null, vocabId)}
        >
          <FiTrash2 size="1.125rem" />
        </button>
      </div>
    </li>
  );
};

export default VocaCard;
