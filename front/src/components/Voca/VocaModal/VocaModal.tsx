import { useState } from 'react';
import { createPortal } from 'react-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRecoilState } from 'recoil';
import { selectedVocaState } from '../../../recoil/atoms/voca';
import { PATCH, POST } from '../../../utils/axios';
import { VocaDataType } from '../../../utils/types/voca';
import Button from '../../Common/Button/Button';
import styles from './VocaModal.module.scss';

type VocaModalPros = {
  onModalClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  isEditMode: boolean;
  onAddNewVoca: (newVoca: VocaDataType) => void;
  onAddEditVoca: (editVoca: VocaDataType) => void;
};

const VocaModal = ({
  onModalClose,
  isEditMode,
  onAddNewVoca,
  onAddEditVoca,
}: VocaModalPros) => {
  const [editVoca, setEditVoca] =
    useRecoilState<VocaDataType>(selectedVocaState);

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

  /**
   * @description Voca 생성 API
   */
  const addNewVocaAPI = async () => {
    try {
      const { data } = await POST('/vocabs', {
        ...newVoca,
      });
      onAddNewVoca(data);
      onModalClose();
      setNewVoca({
        word: '',
        meaning: '',
      });
    } catch (error) {
      // TODO: 에러 처리
      console.log(error);
    }
  };

  /**
   * @description Voca 수정 API
   */
  const editVocaAPI = async () => {
    try {
      const { data } = await PATCH(`/vocabs/${editVoca.vocabId}`, {
        word: editVoca.word,
        meaning: editVoca.meaning,
      });
      onAddEditVoca(data);
      onModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const onEditVocaHandler = (): void => {
    if (!editVoca.meaning || !editVoca.word) return;
    editVocaAPI();
  };

  const onAddNewVocaHandler = (): void => {
    // 유효성 검사
    if (!newVoca.meaning || !newVoca.word) return;
    addNewVocaAPI();
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
