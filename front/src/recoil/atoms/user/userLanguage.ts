import { atom } from 'recoil';
import { profileUser } from '../../../dummy/users';
import { LanguageDataType } from '../../../utils/types/common/common.type';

export const userLanguageState = atom({
  key: 'selectedUserLanguages',
  default: profileUser.language as LanguageDataType[],
});

export const userLanguageNationState = atom({
  key: 'selectedUserLanguageNation',
  default: null,
});

export const userLanguageLevelState = atom({
  key: 'selectedUserLanguageLevel',
  default: null,
});
