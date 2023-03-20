import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

import styles from './VocaCard.module.scss';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

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
  const [isClick, setIsClick] = useState(false);
  const scrollRef: any = useRef(null);

  useEffect(() => {
    if (!isClick) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isClick]);

  const onClickHandler = () => {
    setIsClick(!isClick);
  };

  return (
    <li
      className={styles.card}
      onClick={onClickHandler}
      onKeyUp={(event) => {
        event.preventDefault();
      }}
      role="presentation"
    >
      {/* Word */}
      <div className={styles.word}>{word}</div>
      {/* Meaning */}
      <div
        className={isClick ? styles.meaning : styles.meaning_beforeclick}
        ref={scrollRef}
      >
        {meaning}
      </div>
      {/* 버튼들 */}
      <div className={styles.buttons}>
        {/* 수정 */}
        <button
          className={styles.button}
          onClick={(event) => {
            event.stopPropagation();
            onEdit();
          }}
        >
          <BiEdit size="1.125rem" />
        </button>
        {/* 삭제 */}
        <button
          className={styles.button}
          onClick={(event) => {
            event.stopPropagation();
            onDelete.bind(null, vocabId)();
          }}
        >
          <FiTrash2 size="1.125rem" />
        </button>
      </div>
    </li>
  );
};

export default VocaCard;
