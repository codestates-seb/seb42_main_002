import { atom } from 'recoil';
import { LanguageDataType } from '../../../utils/types/common/common.type';

export const userLanguageState = atom({
  key: 'selectedUserLanguages',
  default: [] as LanguageDataType[],
});

export const userLanguageNationState = atom({
  key: 'selectedUserLanguageNation',
  default: '',
});

export const userLanguageLevelState = atom({
  key: 'selectedUserLanguageLevel',
  default: null,
});
