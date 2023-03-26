import { atom } from 'recoil';

export type pageNationStateType = {
  page: number;
  isStop: boolean;
};

export const pageNationState = atom<number>({
  key: 'pageNationState',
  default: 0,
});

export const letterPagiNationState = atom<number>({
  key: 'letterPagiNationState',
  default: 0,
});
