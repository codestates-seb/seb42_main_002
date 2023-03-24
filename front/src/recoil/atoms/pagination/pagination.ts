import { atom } from 'recoil';

export type pageNationStateType = {
  page: number;
  isStop: boolean;
};

export const pageNationState = atom<number>({
  key: 'pageNationState',
  default: 0,
});
