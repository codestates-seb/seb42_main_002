import { useRecoilState, useRecoilValue } from 'recoil';
import { TbVocabulary } from 'react-icons/tb';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { pageNationState } from '../../recoil/atoms/pagination';
import { vocaSeletor } from '../../recoil/selectors/voca';
import { VocaDataType, vocaListStateType } from '../../utils/types/voca';
import Empty from '../Common/Empty/Empty';
import LastInfinite from '../Common/LastInfinite/LastInfinite';
import VocaCard from './VocaCard/VocaCard';

type RecentVocaListProps = {
  onEdit: (voca: VocaDataType) => void;
  onDelete: () => void;
  addRecentData: (data: vocaListStateType) => void;
};

const RecentVocaList = ({
  onEdit,
  onDelete,
  addRecentData,
}: RecentVocaListProps) => {
  const recentVocaList = useRecoilValue(vocaSeletor);
  const [pagination, setPagination] = useRecoilState(pageNationState);

  const sentinelRef = useInfiniteScroll(async () => {
    if (recentVocaList.isStop) {
      return;
    }
    setPagination((prev) => prev + 1);
    addRecentData(recentVocaList);
  }, pagination);

  /**
   * @description 빈 값 처리
   */
  if (recentVocaList.content.length === 0) {
    return (
      <>
        <Empty title="등록된 단어가 없어요">
          <TbVocabulary size={'6rem'} />
        </Empty>
      </>
    );
  }

  return (
    <>
      {recentVocaList.content.map((voca: VocaDataType) => (
        <VocaCard
          key={voca.vocabId}
          vocabId={voca.vocabId}
          word={voca.word}
          meaning={voca.meaning}
          onEdit={onEdit}
          onDelete={onDelete}
          nation={voca.nation}
        />
      ))}
      <LastInfinite text="마지막 단어 입니다." ref={sentinelRef} />
    </>
  );
};

export default RecentVocaList;
