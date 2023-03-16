import { atom } from 'recoil';

export const selectedSearchLangTagState = atom({
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
