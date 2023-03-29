import { FiTrash2 } from 'react-icons/fi';
import { BiEdit } from 'react-icons/bi';

import styles from './VocaCard.module.scss';
import { VocaDataType } from '../../../utils/types/voca';
import { LANGUAGE_CODE } from '../../../utils';
import { useSetRecoilState } from 'recoil';
import { deleteVocaState } from '../../../recoil/atoms/voca';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import Button from '../../Common/Button/Button';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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
  const [isExtend, setIsExtend] = useState(false);
  const scrollRef: any = useRef(null);

  useEffect(() => {
    if (!isExtend) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isExtend]);

  const onClickHandler = () => {
    setIsExtend(!isExtend);
  };

  return (
    <li
      className={classNames(styles.card, styles.is_required_extend)}
      onKeyUp={(event) => {
        event.preventDefault();
      }}
      role="presentation"
    >
      <div className={styles.card_inner}>
        {/* Word */}
        <div className={styles.word}>{word}</div>
        {/* Meaning */}
        <div className={styles.meaning}>
          <p ref={scrollRef}>{!isExtend && meaning}</p>
          <div className={styles.btn_more}>
            <Button
              size="sm"
              variant="default"
              color={!isExtend ? 'primary' : 'secondary'}
              icon={!isExtend ? <MdArrowDropDown /> : <MdArrowDropUp />}
              iconBtn
              onClick={onClickHandler}
            >
              자세히보기
            </Button>
          </div>
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
      </div>
      {isExtend && <div className={styles.meaning_extend}>{meaning}</div>}
    </li>
  );
};

export default VocaCard;
