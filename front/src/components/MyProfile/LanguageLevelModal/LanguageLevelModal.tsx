import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { languageLevels } from '../../../dummy/Tags';
import useModals from '../../../hooks/useModals';
import {
  userLanguageNationState,
  userLanguageState,
} from '../../../recoil/atoms/user/userLanguage';
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
  const [selectedLevel, setSeletedLevel] = useState<number>();
  const selectedUserLanguageNation = useRecoilValue(userLanguageNationState);
  const [selectedUserLanguages, setSelectedUserLanguages] =
    useRecoilState<any[]>(userLanguageState);

  const onSelectLevelHandler = (level: number) => {
    setSeletedLevel(level);
  };

  const onSubmitHandler = async () => {
    if (onSubmit) {
      const findIdx = selectedUserLanguages.findIndex(
        (lang) => lang.nation === selectedUserLanguageNation
      );
      try {
        const prevState = selectedUserLanguages.map((lang) => ({
          nation: lang.nation,
          level: lang.level,
        }));
        const { status } = await PATCH('/members', {
          language: [
            ...prevState,
            {
              nation: selectedUserLanguageNation,
              level: selectedLevel,
            },
          ],
        });
        if (status === 200) {
          // 언어 추가
          if (findIdx < 0) {
            const newLanguages = {
              nation: selectedUserLanguageNation,
              level: selectedLevel,
            };
            setSelectedUserLanguages((prevState) => [
              ...prevState,
              newLanguages,
            ]);
          } else {
            // 언어 레벨 수정
            setSelectedUserLanguages((prevState) => [
              ...prevState.map((lang) => {
                if (lang.nation === selectedUserLanguageNation) {
                  return {
                    ...lang,
                    level: selectedLevel,
                  };
                }
                return lang;
              }),
            ]);
          }
          closeModal(LanguageSearchModal);
          onClose && onClose();
        }
      } catch (error) {
        console.error(error);
      }
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
