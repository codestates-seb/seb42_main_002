import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { languageLevels } from '../../../dummy/languages';
import useModals from '../../../hooks/useModals';
import { userLanguageNationState } from '../../../recoil/atoms/user/userLanguage';
import { userLanguageSeletor } from '../../../recoil/selectors';
import { LanguageDataType, LANGUAGE_CODE } from '../../../utils';
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
    useRecoilState<LanguageDataType[]>(userLanguageSeletor);

  // 언어 레벨 선택
  const onSelectLevelHandler = (level: number) => {
    setSeletedLevel(level);
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      const findIdx = selectedUserLanguages.findIndex(
        (lang: LanguageDataType) => lang.nation === selectedUserLanguageNation
      );
      if (findIdx < 0) {
        // 언어 추가
        const newLanguages: LanguageDataType = {
          nation: selectedUserLanguageNation as LANGUAGE_CODE,
          level: selectedLevel,
        };
        setSelectedUserLanguages((prevState) => {
          const oldLanguages = prevState.map((lang) => ({
            nation: lang.nation,
            level: lang.level,
          }));
          return [...oldLanguages, newLanguages];
        });
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
