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
import InfoGroup from '../../Common/InfoGroup/InfoGroup';
import Flex from '../../Common/Flex/Flex';
import Label from '../../Common/Label/Label';

import styles from './SearchFilterModal.module.scss';
import SearchLangTagFilter from '../SearchLangTagFilter/SearchLangTagFilter';

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
    openModal(SearchLangTagFilter);
  };

  const openTagFilterModal = () => {
    console.log('태그 필터');
    openModal(SearchTagFilter);
  };

  return (
    <FullPageModal onClose={onClose} onSubmit={onSubmit}>
      {/* 언어 태그 */}
      <InfoGroup className="extra_info">
        <h3 className={styles.title}>
          선택된 <span className={styles.strong}>언어</span> 필터
        </h3>
        <InfoGroup.Content>
          <Flex gap="sm" wrap="wrap">
            {searchLangTags &&
              searchLangTags.map((tag) => (
                <Flex.Col key={tag.languageId}>
                  <Label>{tag.name}</Label>
                </Flex.Col>
              ))}
            <Button size="sm" variant="dashed" onClick={openLangFilterModal}>
              + 언어 필터 추가
            </Button>
          </Flex>
        </InfoGroup.Content>
      </InfoGroup>

      {/* 취미 태그 */}
      <InfoGroup className="extra_info">
        <h3 className={styles.title}>
          선택된 <span className={styles.strong}>태그</span> 필터
        </h3>
        <InfoGroup.Content>
          <Flex gap="sm" wrap="wrap">
            {searchTags &&
              searchTags.map((tag) => (
                <Flex.Col key={tag.tagId}>
                  <Label>{tag.name}</Label>
                </Flex.Col>
              ))}
            <Button size="sm" variant="dashed" onClick={openTagFilterModal}>
              + 태그 필터 추가
            </Button>
          </Flex>
        </InfoGroup.Content>
      </InfoGroup>
    </FullPageModal>
  );
};

export default SearchFilterModal;
