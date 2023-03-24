import { useCallback } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useModals from '../../../hooks/useModals';
import {
  userLanguageNationState,
  userLanguageState,
} from '../../../recoil/atoms';
import { userLanguageSeletor } from '../../../recoil/selectors';
import { toast } from '../../../utils';
import { PATCH } from '../../../utils/axios';
import { langTransformer } from '../../../utils/common';
import { LANGUAGE_CODE } from '../../../utils/enums/common/common.enum';
import { LanguageDataType } from '../../../utils/types/common/common.type';
import Button from '../../Common/Button/Button';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import AlertModal, { AlertModalProps } from '../../Common/Modal/AlertModal';
import LanguageLevelModal from '../LanguageLevelModal/LanguageLevelModal';
import styles from './LanguageListItem.module.scss';

type LanguageListItemProps = {
  item: LanguageDataType;
};

const confirmRemoveLanguageaModal = ({
  onSubmit,
  onClose,
}: AlertModalProps) => {
  const [selectedUserLanguages, setSelectedUserLanguages] =
    useRecoilState<LanguageDataType[]>(userLanguageState);
  const selectedUserLanguageNation = useRecoilValue(userLanguageNationState);

  const deleteLanguage = async () => {
    const filterdLanguages = selectedUserLanguages.filter(
      (lang) => lang.nation !== selectedUserLanguageNation
    );
    if (filterdLanguages.length === 0) {
      toast.error('언어를 하나이상 선택해주세요');
      return;
    }
    try {
      const response = await PATCH('/users/me', {
        language: filterdLanguages,
      });
      if (response) {
        setSelectedUserLanguages(filterdLanguages);
        toast.success('삭제 완료되었습니다!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = useCallback(() => {
    deleteLanguage();
    onSubmit && onSubmit();
  }, []);

  const onCloseHandler = () => {
    onClose && onClose();
  };

  return (
    <AlertModal
      title="언어 삭제"
      onSubmit={onSubmitHandler}
      onClose={onCloseHandler}
    >
      <p className="text_center">정말 삭제 하시겠습니까?</p>
    </AlertModal>
  );
};

const LanguageListItem = ({ item }: LanguageListItemProps) => {
  const { openModal } = useModals();
  const setSelectedUserLanguageNation = useSetRecoilState(
    userLanguageNationState
  );

  const onEditLanguageHandler = (nation: LANGUAGE_CODE) => {
    openModal(LanguageLevelModal);
    setSelectedUserLanguageNation(nation);
  };

  const onDeleteLanguageHandler = (nation: LANGUAGE_CODE) => {
    setSelectedUserLanguageNation(nation);
    openModal(confirmRemoveLanguageaModal);
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
