import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

import styles from './VocaCard.module.scss';
import { VocaDataType } from '../../../utils/types/voca';
import { LANGUAGE_CODE } from '../../../utils';
import { useSetRecoilState } from 'recoil';
import { deleteVocaState } from '../../../recoil/atoms/voca';

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

  return (
    <li className={styles.card}>
      {/* Word */}
      <div className={styles.word}>{word}</div>
      {/* Meaning */}
      <div className={styles.meaning}>{meaning}</div>
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
