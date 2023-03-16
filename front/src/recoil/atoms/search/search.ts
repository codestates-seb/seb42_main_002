import { LANGUAGE_CODE } from './../../../utils/enums/common/common.enum';
import { atom } from 'recoil';

type selectedSearchLangTagStateType = {
  languageId: number;
  name: string;
  englishName: string;
  nation: LANGUAGE_CODE;
  filterTag: string;
};

export const selectedSearchLangTagState = atom<
  selectedSearchLangTagStateType[]
>({
  key: 'selectedSearchLangTagState',
  default: [],
});

type selectedSearchTagStateType = {
  tagId: number;
  name: string;
};

export const selectedSearchTagState = atom<selectedSearchTagStateType[]>({
  key: 'selectedSearchTagState',
  default: [],
});
