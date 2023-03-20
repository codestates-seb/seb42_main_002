import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { VocaDataType } from '../../utils/types/voca';
import VocaCard from './VocaCard/VocaCard';
import Button from '../Common/Button/Button';
import VocaModal from './VocaModal/VocaModal';
import styles from './Voca.module.scss';

import { vocaArr } from '../../dummy/voca';
import { DELETE, GET } from '../../utils/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { deleteVocaState, selectedVocaState } from '../../recoil/atoms/voca';
import AlertModal from '../Common/Modal/AlertModal';

const Voca = () => {
  const setSelectedVoca = useSetRecoilState(selectedVocaState);
  const deleteVocaId = useRecoilValue(deleteVocaState);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [vocaList, setVocaList] = useState<VocaDataType[]>([...vocaArr]);
  const [page, setPage] = useState<number>(0);
  const SIZE = 10;

  /**
   * @description Vocabs API
   */
  const getVocaList = async () => {
    try {
      // TODO: 무한 스크롤
      const { data } = await GET(`/vocabs?page=${page}&size=${SIZE}`);
      const formattedVacaList = data.content.map((voca: VocaDataType) => ({
        vocabId: voca.vocabId,
        meaning: voca.meaning,
        word: voca.word,
        nation: voca.nation,
      }));

      setVocaList(formattedVacaList);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description Vocabs 삭제 API
   */
  const deleteVoca = async () => {
    if (!deleteVocaId) return;
    try {
      await DELETE(`vocabs/${deleteVocaId}`);
      getVocaList();
      setIsAlertOpen(false);
    } catch (error) {
      // TODO: 에러 처리
      console.log(error);
    }
  };

  useEffect(() => {
    getVocaList();
  }, []);

  const onAddModalHandler = () => {
    setIsOpenModal(true);
    setIsEditMode(false);
  };

  const onEditModalHandler = (voca: VocaDataType) => {
    setSelectedVoca(voca);
    setIsOpenModal(true);
    setIsEditMode(true);
  };

  const onDeleteHandler = () => {
    setIsAlertOpen(true);
  };

  const setNewVocaList = (newVoca: VocaDataType) => {
    setVocaList((prev) => [...prev, newVoca]);
  };

  const setEditVocaList = (editVoca: VocaDataType) => {
    setVocaList((prev) => {
      return prev.map((voca: VocaDataType) =>
        voca.vocabId !== editVoca.vocabId
          ? voca
          : {
              ...voca,
              meaning: editVoca.meaning,
              word: editVoca.word,
            }
      );
    });
  };

  return (
    <>
      {isOpenModal && (
        <VocaModal
          isEditMode={isEditMode}
          onModalClose={() => setIsOpenModal(false)}
          onAddNewVoca={setNewVocaList}
          onAddEditVoca={setEditVocaList}
        />
      )}
      {isAlertOpen && (
        <AlertModal
          labelClose="닫기"
          labelSubmit="삭제"
          onClose={() => {
            setIsAlertOpen(false);
          }}
          onSubmit={deleteVoca}
        >
          단어를 삭제하겠습니까?
        </AlertModal>
      )}
      {/* 단어 리스트 */}
      <ul className={styles.card_list}>
        {vocaList.map((voca: VocaDataType) => (
          <VocaCard
            key={voca.vocabId}
            vocabId={voca.vocabId}
            word={voca.word}
            meaning={voca.meaning}
            onEdit={onEditModalHandler}
            onDelete={onDeleteHandler}
            nation={voca.nation}
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
