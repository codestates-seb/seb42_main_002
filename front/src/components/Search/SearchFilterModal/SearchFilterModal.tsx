import useModals from '../../../hooks/useModals';
import Button from '../../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import SearchTagFilter from '../SearchTagFilter/SearchTagFilter';
// 더미 데이터
import { profileUser } from '../../../dummy/users';
import { useRecoilState } from 'recoil';
import {
  selectedSearchLangTagState,
  selectedSearchTagState,
} from '../../../recoil/atoms/search';

const SearchFilterModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const { openModal } = useModals();

  // 언어 태그들
  const [searchLangTags, setSearchLangTags] = useRecoilState(
    selectedSearchLangTagState
  );

  // 취미 태그들
  const [searchTags, setSearchTags] = useRecoilState(selectedSearchTagState);

  const openLangFilterModal = () => {
    console.log('언어 필터');
    // openModal(SearchTagFilter);
  };

  const openTagFilterModal = () => {
    console.log('태그 필터');
    openModal(SearchTagFilter);
  };

  return (
    <FullPageModal onClose={onClose} onSubmit={onSubmit}>
      <Button variant="primary" size="md" onClick={openTagFilterModal}>
        언어 필터 테스트
      </Button>
      <Button variant="primary" size="md" onClick={openTagFilterModal}>
        태그 필터 테스트
      </Button>
    </FullPageModal>
  );
};

export default SearchFilterModal;
