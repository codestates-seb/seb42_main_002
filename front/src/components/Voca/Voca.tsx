import { Suspense, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { VocaDataType, vocaListStateType } from '../../utils/types/voca';
import { DELETE } from '../../utils/axios';
import {
  deleteVocaState,
  selectedVocaState,
  vocaListState,
} from '../../recoil/atoms/voca';
import { pageNationState } from '../../recoil/atoms/pagination';
import InnerSpinner from '../Common/Spinner/InnerSpinner';
import AlertModal from '../Common/Modal/AlertModal';
import RecentVocaList from './RecentVocaList';
import VocaCard from './VocaCard/VocaCard';
import Button from '../Common/Button/Button';
import VocaModal from './VocaModal/VocaModal';
import styles from './Voca.module.scss';

const Voca = () => {
  const setSelectedVoca = useSetRecoilState(selectedVocaState);
  const setPagination = useSetRecoilState(pageNationState);
  const [vocaList, setVocaList] = useRecoilState(vocaListState);
  const deleteVocaId = useRecoilValue(deleteVocaState);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const addRecentVocaList = (data: vocaListStateType) => {
    setVocaList((prev) => ({
      content: [...prev.content, ...data.content],
      isStop: data.isStop,
    }));
  };

  const resetVocaList = () => {
    setVocaList({
      content: [],
      isStop: false,
    });
    setPagination(0);
  };

  /**
   * @description Vocabs 삭제 API
   */
  const deleteVoca = async () => {
    if (!deleteVocaId) return;
    try {
      await DELETE(`vocabs/${deleteVocaId}`);
      setIsAlertOpen(false);
      resetVocaList();
    } catch (error) {
      // TODO: 에러 처리
      console.log(error);
    }
  };

  /**
   * @description 페이지 이동 시, 초기화
   */
  useEffect(() => {
    return resetVocaList;
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

  const setNewVocaList = () => {
    resetVocaList();
  };

  const setEditVocaList = (editVoca: VocaDataType) => {
    setVocaList((prev) => {
      const newList = prev.content.map((voca: VocaDataType) =>
        voca.vocabId !== editVoca.vocabId
          ? voca
          : {
              ...voca,
              meaning: editVoca.meaning,
              word: editVoca.word,
            }
      );

      return {
        ...prev,
        content: newList,
      };
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
        {vocaList.content.map((voca: VocaDataType) => (
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
        {/* 새로 불러오는 VocaList */}
        <Suspense fallback={<InnerSpinner size="sm" />}>
          <RecentVocaList
            onEdit={onEditModalHandler}
            onDelete={onDeleteHandler}
            addRecentData={addRecentVocaList}
          />
        </Suspense>
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
