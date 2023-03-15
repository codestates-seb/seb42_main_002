import React from 'react';
import {BsTrash} from 'react-icons/bs';
import {MdEdit} from 'react-icons/md';
import useModals from '../../../hooks/useModals';
import {langTransformer} from '../../../utils/common';
import {LanguageDataType} from '../../../utils/types/common/common.type';
import Button from '../../Common/Button/Button';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import LanguageLevelModal from '../LanguageLevelModal/LanguageLevelModal';
import styles from './LanguageListItem.module.scss';

type LanguageListItemProps = {
  item: LanguageDataType;
};

const LanguageListItem = ({ item }: LanguageListItemProps) => {
  // const dispatch = useDispatch();
  const { openModal } = useModals();

  const onEditLanguageHandler = (nation: any) => {
    // dispatch({ type: 'SELECT_NATION', payload: nation });
    openModal(LanguageLevelModal, {
      onSubmit: () => {
        console.log('onSubmit');
      },
    });
  };

  const onDeleteLanguageHandler = (nation: any) => {
    // dispatch({ type: 'REMOVE_LANGUAGE', payload: nation });
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
          icon={<MdEdit />}
          iconBtn
          onClick={() => onEditLanguageHandler(item.nation)}
        >
          편집
        </Button>
        <Button
          size="sm"
          variant="default"
          icon={<BsTrash />}
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
