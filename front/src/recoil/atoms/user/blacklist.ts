import { atom } from 'recoil';
import { blackListStateType } from '../../../utils';

export const blackListState = atom<blackListStateType>({
  key: 'blackListState',
  default: {
    content: [],
    isStop: false,
  },
});
