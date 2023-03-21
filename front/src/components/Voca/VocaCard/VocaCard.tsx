import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

import styles from './VocaCard.module.scss';
import { VocaDataType } from '../../../utils/types/voca';
import { LANGUAGE_CODE } from '../../../utils';
import { useSetRecoilState } from 'recoil';
import { deleteVocaState } from '../../../recoil/atoms/voca';
import { useEffect, useState } from 'react';
import { useRef } from 'react';

type VocaCardProps = {
  word: string;
  vocabId: number;
  meaning: string;
  nation: string | LANGUAGE_CODE;
  onEdit: (voca: VocaDataType) => void;
  onDelete: () => void;
};

const VocaCard = ({
  word,
  meaning,
  vocabId,
  nation,
  onEdit,
  onDelete,
}: VocaCardProps) => {
  const setDeleteVocaIdx = useSetRecoilState(deleteVocaState);
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
          onClick={onEdit.bind(null, { word, meaning, vocabId, nation })}
        >
          <BiEdit size="1.125rem" />
        </button>
        {/* 삭제 */}
        <button
          className={styles.button}
          onClick={() => {
            onDelete();
            setDeleteVocaIdx(vocabId);
          }}
        >
          <FiTrash2 size="1.125rem" />
        </button>
      </div>
    </li>
  );
};

export default VocaCard;
