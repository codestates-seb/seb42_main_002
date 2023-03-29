import { atom } from 'recoil';

export const rerenderingTriggerState = atom<number>({
  key: 'rerenderingTriggerState',
  default: 0,
});
