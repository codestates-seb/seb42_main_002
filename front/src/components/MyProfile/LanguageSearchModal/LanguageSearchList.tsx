import { useState, useCallback } from 'react';
import LabelButton from '../../Common/LabelButton/LabelButton';
import { BsPlus } from 'react-icons/bs';
import Flex from '../../Common/Flex/Flex';
import LanguageLevelModal from '../../MyProfile/LanguageLevelModal/LanguageLevelModal';
import useModals from '../../../hooks/useModals';
import { LANGUAGE_CODE } from '../../../utils/enums/common/common.enum';
import { LanguageDataType } from '../../../utils/types/common/common.type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userLanguageNationState,
  userLanguageState,
} from '../../../recoil/atoms/user/userLanguage';
import { languageTags } from '../../../dummy/languages';

type LanguageSearchListProps = {
  languages: LanguageDataType[];
};

const LanguageSearchList = ({ languages }: LanguageSearchListProps) => {
  const { openModal } = useModals();
  const selectedUserLanguages = useRecoilValue(userLanguageState);
  const setSelectedUserLanguageNation = useSetRecoilState(
    userLanguageNationState
  );
  const [selected] = useState<LanguageDataType[]>(
    languageTags.filter((lang) =>
      selectedUserLanguages.map((lang) => lang.nation).includes(lang.nation)
    )
  );

  const onClickLanguageLevelModalHandler = useCallback(
    (nation: LANGUAGE_CODE) => {
      setSelectedUserLanguageNation(nation);
      openModal(LanguageLevelModal);
    },
    [openModal]
  );

  return (
    <>
      {languages &&
        languages.map((lang: LanguageDataType, index: number) => {
          return (
            <LabelButton
              key={index}
              isActive={selected.includes(lang)}
              onClick={() =>
                !selected.includes(lang)
                  ? onClickLanguageLevelModalHandler(lang.nation)
                  : null
              }
              full
            >
              <LabelButton.Content>
                <Flex justify="between" align="center">
                  <Flex.Col>
                    <Flex gap="sm">
                      <Flex.Col>
                        <span>{lang.name}</span>
                      </Flex.Col>
                      <Flex.Col>
                        <span>{lang.englishName}</span>
                      </Flex.Col>
                    </Flex>
                  </Flex.Col>
                  {lang.level && (
                    <Flex.Col>
                      <span>Lv.{lang.level}</span>
                    </Flex.Col>
                  )}
                </Flex>
              </LabelButton.Content>
              {!selected.includes(lang) && <BsPlus />}
            </LabelButton>
          );
        })}
    </>
  );
};

export default LanguageSearchList;
