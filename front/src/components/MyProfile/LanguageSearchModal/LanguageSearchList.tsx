import { useState, useCallback, useEffect } from 'react';
import { langTransformer } from '../../../utils/common';
import { UserData } from '../../../utils';
import LabelButton from '../../Common/LabelButton/LabelButton';
import { BsPlus } from 'react-icons/bs';
import Flex from '../../Common/Flex/Flex';
import LanguageLevelModal from '../../MyProfile/LanguageLevelModal/LanguageLevelModal';
import useModals from '../../../hooks/useModals';
import { LANGUAGE_CODE } from '../../../utils/enums/common/common.enum';
import { LanguageDataType } from '../../../utils/types/common/common.type';
import { useRecoilValue } from 'recoil';
import { userLanguageState } from '../../../recoil/atoms/userLanguage';

type LanguageSearchListProps = {
  languages: any[];
};

const LanguageSearchList = ({ languages }: LanguageSearchListProps) => {
  const { openModal } = useModals();
  // const dispatch = useDispatch();
  const selectedUserLanguages = useRecoilValue(userLanguageState);
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<LanguageDataType[]>(
    selectedUserLanguages.map((lang) => lang)
  );
  const [notSelected, setNotSelected] = useState<any[]>(
    languages
      .filter((lang) => !selected.map((el) => el.nation).includes(lang))
      .map((nation) => ({ nation: nation }))
  );

  const onClickLanguageLevelModalHandler = useCallback(
    (nation: LANGUAGE_CODE) => {
      // dispatch({ type: 'SELECT_NATION', payload: nation });
      openModal(LanguageLevelModal, {
        onSubmit: () => {
          console.log('onSubmit');
        },
      });
    },
    [openModal]
  );

  // // TODO : 버그 수정
  // useEffect(() => {
  //   if (selectedLanguage) {
  //     setSelected((prevState) => [...prevState, selectedLanguage]);
  //     setNotSelected((prevState) =>
  //       prevState.filter((lang) => lang.nation !== selectedLanguage.nation)
  //     );
  //   }
  // }, [selectedLanguage]);

  useEffect(() => {
    setItems([...selected, ...notSelected]);
  }, [selected, notSelected]);

  return (
    <>
      {items.map((lang: any, index: number) => {
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
                      <span>{langTransformer(lang.nation)}</span>
                    </Flex.Col>
                    <Flex.Col>
                      <span>{langTransformer(lang.nation, true)}</span>
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
