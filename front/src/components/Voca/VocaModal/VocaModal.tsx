import { useState } from 'react';
import { createPortal } from 'react-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import Button from '../../Common/Button/Button';
import styles from './VocaModal.module.scss';

type VocaModalPros = {
  onModalClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  isEditMode: boolean;
};

const VocaModal = ({ onModalClose, isEditMode }: VocaModalPros) => {
  // 보카 수정 - 리코일에서 가져오기
  const [editVoca, setEditVoca] = useState({
    word: 'Orange',
    meaning: '오렌지도 새콤 달콤',
  });

  // 새 보카
  const [newVoca, setNewVoca] = useState({
    word: '',
    meaning: '',
  });

  const onChangeEditVocaHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setEditVoca((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeNewVocaHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setNewVoca((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onEditVocaHandler = (): void => {
    console.log('보카 수정', editVoca);
    onModalClose();
  };

  const onAddNewVocaHandler = (): void => {
    console.log('보카 생성', newVoca);
    onModalClose();
  };

  return createPortal(
    <div role="dialog" aria-modal="true" className={styles.modal_bg}>
      <div className={styles.modal}>
        {/* header */}
        <header className={styles.header}>
          <div className={styles.word_wrapper}>
            <input
              type="text"
              name="word"
              placeholder="단어를 입력해주세요"
              className={styles.word}
              value={isEditMode ? editVoca.word : newVoca.word}
              onChange={
                isEditMode ? onChangeEditVocaHandler : onChangeNewVocaHandler
              }
            />
          </div>
          <button className={styles.close} onClick={onModalClose}>
            <TiDeleteOutline size="1.5rem" />
          </button>
        </header>
        {/* body */}
        <div className={styles.body}>
          {/* TODO : 임시 textarea */}
          <textarea
            name="meaning"
            placeholder="의미를 입력해주세요"
            className={styles.meaning}
            value={isEditMode ? editVoca.meaning : newVoca.meaning}
            onChange={
              isEditMode ? onChangeEditVocaHandler : onChangeNewVocaHandler
            }
          />
        </div>
        <Button
          variant="primary"
          size="lg"
          full
          onClick={isEditMode ? onEditVocaHandler : onAddNewVocaHandler}
        >
          {isEditMode ? '수정 하기' : '추가 하기'}
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default VocaModal;
