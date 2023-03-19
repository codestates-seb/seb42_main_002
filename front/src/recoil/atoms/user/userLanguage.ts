import { atom } from 'recoil';
import { LanguageDataType } from '../../../utils/types/common/common.type';

export const userLanguageState = atom({
  key: 'userLanguageState',
  default: [] as LanguageDataType[],
});

export const userLanguageNationState = atom({
  key: 'userLanguageNationState',
  default: '',
});

export const userLanguageLevelState = atom({
  key: 'userLanguageLevelState',
  default: null,
});
