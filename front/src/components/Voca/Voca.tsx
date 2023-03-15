import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import VocaCard from './VocaCard/VocaCard';
import Button from '../Common/Button/Button';
import VocaModal from './VocaModal/VocaModal';
import styles from './Voca.module.scss';

import { vocaArr } from '../../dummy/voca';

const Voca = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onAddModalHandler = () => {
    console.log('생성 모달');
    setIsOpenModal(true);
    setIsEditMode(false);
  };

  const onEditModalHandler = () => {
    console.log('수정 모달');
    setIsOpenModal(true);
    setIsEditMode(true);
  };

  const onDeleteHandler = (vocabId: number) => {
    console.log('삭제', vocabId);
  };

  return (
    <>
      {isOpenModal && (
        <VocaModal
          isEditMode={isEditMode}
          onModalClose={() => setIsOpenModal(false)}
        />
      )}
      {/* 단어 리스트 */}
      <ul className={styles.card_list}>
        {vocaArr.map((voca) => (
          <VocaCard
            key={voca.vocabId}
            vocabId={voca.vocabId}
            word={voca.word}
            meaning={voca.meaning}
            onEdit={onEditModalHandler}
            onDelete={onDeleteHandler}
          />
        ))}
      </ul>
      <Button
        variant="primary"
        size="md"
        iconBtn
        icon={<AiOutlinePlus />}
        className={styles.button}
        onClick={onAddModalHandler}
      />
    </>
  );
};

export default Voca;
