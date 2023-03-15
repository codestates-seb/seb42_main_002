import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userLanguageLevelState } from '../../../recoil/atoms/user/userLanguage';
import { UserData } from '../../../utils';
import Flex from '../../Common/Flex/Flex';
import LabelButton from '../../Common/LabelButton/LabelButton';
import FullPageModal, {
  FullPageModalProps,
} from '../../Common/Modal/FullPageModal';

const languageLevels = [
  {
    level: 1,
    text: '관심 있음',
  },
  {
    level: 2,
    text: '초급 수준',
  },
  {
    level: 3,
    text: '중급 수준',
  },
  {
    level: 4,
    text: '고급 수준',
  },
  {
    level: 5,
    text: '원어민 수준',
  },
];

/**
 * 언어 레벨 선택 모달
 * @param
 * @returns
 */
const LanguageLevelModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  const [selectedLevel, setSeletedLvel] = useState();
  // const { selectedLanguage, selectedNationValue } = useSelector(
  //   (state: { user: UserData }) => state.user
  // );
  // const dispatch = useDispatch();
  const [selectedUserLanguageLevel, setSelectedUserLanguageLevel] =
    useRecoilState(userLanguageLevelState);

  const onSelectLevelHandler = (level: any) => {
    setSelectedUserLanguageLevel(level);
  };

  const onSubmitHandler = () => {
    if (onSubmit) {
      // dispatch({
      //   type: 'SELECT_LANGUAGE',
      //   payload: {
      //     nation: selectedNationValue,
      //     level: selectedLevel,
      //   },
      // });
      // dispatch({
      //   type: 'CHANGE_LEVEL',
      //   payload: {
      //     nation: selectedLanguage.nation,
      //     level: selectedLevel,
      //   },
      // });
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <FullPageModal
      onSubmit={onSubmitHandler}
      onClose={onClose}
      labelSubmit="수정"
    >
      {languageLevels.map((level) => (
        <>
          <LabelButton
            full
            key={level.level}
            onClick={() => onSelectLevelHandler(level.level)}
            isActive={level.level === selectedUserLanguageLevel}
          >
            <LabelButton.Content>
              <Flex gap="sm">
                <Flex.Col>Lv. {level.level}</Flex.Col>
                <Flex.Col>{level.text}</Flex.Col>
              </Flex>
            </LabelButton.Content>
          </LabelButton>
        </>
      ))}
    </FullPageModal>
  );
};
export default LanguageLevelModal;
