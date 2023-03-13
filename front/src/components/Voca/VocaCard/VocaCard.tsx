import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

import styles from './VocaCard.module.scss';

type VocaCardProps = {
  word: string;
  meaning: string;
  onEdit: () => void;
  onDelete: () => void;
};

const VocaCard = ({ word, meaning, onEdit, onDelete }: VocaCardProps) => {
  return (
    <li className={styles.card}>
      {/* Word */}
      <div className={styles.word}>{word}</div>
      {/* Meaning */}
      <div className={styles.meaning}>{meaning}</div>
      {/* 버튼들 */}
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onEdit}>
          <BiEdit size="1.125rem" />
        </button>
        <button className={styles.button} onClick={onDelete}>
          <FiTrash2 size="1.125rem" />
        </button>
      </div>
    </li>
  );
};

export default VocaCard;
