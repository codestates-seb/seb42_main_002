import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { languageLevels } from '../../../dummy/languages';
import useModals from '../../../hooks/useModals';
import { userLocationState } from '../../../recoil/atoms';
import {
  userLanguageNationState,
  userLanguageState,
} from '../../../recoil/atoms/user/userLanguage';
import { LanguageDataType, LANGUAGE_CODE, toast } from '../../../utils';
import { PATCH } from '../../../utils/axios';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';
import LanguageSearchModal from '../LanguageSearchModal/LanguageSearchModal';

/**
 * 언어 레벨 선택 모달
 * @param
 * @returns
 */
const LanguageLevelModal = ({
  onSubmit,
  onClose,
  labelSubmit,
}: FullPageModalProps) => {
  const { closeModal } = useModals();
  const selectedUserLocation = useRecoilValue(userLocationState);
  const selectedUserLanguageNation = useRecoilValue(userLanguageNationState);
  const [selectedLevel, setSeletedLevel] = useState<number>();
  const [selectedUserLanguages, setSelectedUserLanguages] =
    useRecoilState<LanguageDataType[]>(userLanguageState);
  const [changeLanguages, setChangeLanguages] = useState<LanguageDataType[]>([
    ...selectedUserLanguages,
  ]);

  // 언어 레벨 선택
  const onSelectLevelHandler = (level: number) => {
    setSeletedLevel(level);

    const oldLanguages: LanguageDataType[] = selectedUserLanguages.map(
      (lang) => ({
        nation: lang.nation,
        level: lang.level,
      })
    );

    const newLanguages: LanguageDataType = {
      nation: selectedUserLanguageNation as LANGUAGE_CODE,
      level: level,
    };

    const changeLevel = oldLanguages.map((lang) => {
      if (lang.nation === selectedUserLanguageNation) {
        return {
          ...lang,
          level: level,
        };
      }
      return lang;
    });

    const findIdx = selectedUserLanguages.findIndex(
      (lang: LanguageDataType) => lang.nation === selectedUserLanguageNation
    );

    if (findIdx < 0) {
      // 언어 추가
      setChangeLanguages(() => {
        return [...oldLanguages, newLanguages];
      });
    } else {
      // 언어 레벨 수정
      setChangeLanguages(() => changeLevel);
    }
  };

  const updateLanguage = async () => {
    try {
      const response = await PATCH('/users', {
        language: changeLanguages,
      });
      if (response) {
        setSelectedUserLanguages(changeLanguages);
        toast.success('수정 완료되었습니다!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      if (!selectedUserLocation) {
        // 첫 설정 일 때
        setSelectedUserLanguages(changeLanguages);
      } else {
        // 수정 일 때
        updateLanguage();
      }
      closeModal(LanguageSearchModal);
      onClose && onClose();
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit={labelSubmit}
    >
      {languageLevels.map((level, index) => (
        <LabelButton
          full
          key={index}
          onClick={() => onSelectLevelHandler(level.level)}
          isActive={level.level === selectedLevel}
        >
          <LabelButton.Content>
            <Flex gap="sm">
              <Flex.Col>Lv. {level.level}</Flex.Col>
              <Flex.Col>{level.text}</Flex.Col>
            </Flex>
          </LabelButton.Content>
        </LabelButton>
      ))}
    </FullPageModal>
  );
};
export default LanguageLevelModal;
