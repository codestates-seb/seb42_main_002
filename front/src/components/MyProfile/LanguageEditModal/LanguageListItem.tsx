import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { useSetRecoilState } from 'recoil';
import useModals from '../../../hooks/useModals';
import {
  userLanguageNationState,
  userLanguageState,
} from '../../../recoil/atoms';
import { langTransformer } from '../../../utils/common';
import { LANGUAGE_CODE } from '../../../utils/enums/common/common.enum';
import { LanguageDataType } from '../../../utils/types/common/common.type';
import Button from '../../Common/Button/Button';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import LanguageLevelModal from '../LanguageLevelModal/LanguageLevelModal';
import styles from './LanguageListItem.module.scss';

type LanguageListItemProps = {
  item: LanguageDataType;
};

const LanguageListItem = ({ item }: LanguageListItemProps) => {
  const { openModal } = useModals();
  const setSelectedUserLanguageNation = useSetRecoilState(
    userLanguageNationState
  );
  const setSelectedUserLanguages = useSetRecoilState<any[]>(userLanguageState);

  const onEditLanguageHandler = (nation: LANGUAGE_CODE) => {
    openModal(LanguageLevelModal);
    setSelectedUserLanguageNation(nation);
  };

  const onDeleteLanguageHandler = (nation: LANGUAGE_CODE) => {
    setSelectedUserLanguages((prevState) =>
      prevState.filter((lang) => lang.nation !== nation)
    );
  };

  return (
    <LabelButton key={item.nation}>
      <LabelButton.Content>
        <Flex justify="between" align="center">
          <Flex.Col>
            <Flex gap="sm">
              <Flex.Col>
                <span className={styles.name}>
                  {langTransformer(item.nation)}
                </span>
              </Flex.Col>
              <Flex.Col>
                <span className={styles.englishName}>
                  {langTransformer(item.nation, true)}
                </span>
              </Flex.Col>
            </Flex>
          </Flex.Col>
          <Flex.Col>
            <span className={styles.level}>Lv.{item.level}</span>
          </Flex.Col>
        </Flex>
      </LabelButton.Content>
      <LabelButton.Action>
        <Button
          size="sm"
          variant="default"
          icon={<BiEdit />}
          iconBtn
          onClick={() => onEditLanguageHandler(item.nation)}
        >
          편집
        </Button>
        <Button
          size="sm"
          variant="default"
          icon={<FiTrash2 />}
          iconBtn
          onClick={() => onDeleteLanguageHandler(item.nation)}
        >
          삭제
        </Button>
      </LabelButton.Action>
    </LabelButton>
  );
};

export default LanguageListItem;
