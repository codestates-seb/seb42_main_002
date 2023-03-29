import { LanguageDataType } from './../../../utils/types/common/common.type';
import { atom } from 'recoil';
import { TagDataType } from '../../../utils/types/tags/tags';

type selectedSearchLangTagStateType = LanguageDataType;

export const selectedSearchLangTagState = atom<
  selectedSearchLangTagStateType[]
>({
  key: 'selectedSearchLangTagState',
  default: [],
});

export const selectedSearchTagState = atom<TagDataType[]>({
  key: 'selectedSearchTagState',
  default: [],
});
