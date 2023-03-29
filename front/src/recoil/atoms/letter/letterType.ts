import { atom } from 'recoil';

export const letterTypeState = atom<number>({
  key: 'letterTypeState',
  default: 0,
});
