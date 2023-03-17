import { LanguageDataType } from './../../../utils/types/common/common.type';
import { LANGUAGE_CODE } from './../../../utils/enums/common/common.enum';
import { atom } from 'recoil';

type selectedSearchLangTagStateType = LanguageDataType;

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
