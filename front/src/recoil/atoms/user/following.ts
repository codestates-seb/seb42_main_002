import { atom } from 'recoil';
import { followingListStateType } from '../../../utils';

export const followingListState = atom<followingListStateType>({
  key: 'followingListState',
  default: {
    content: [],
    isStop: false,
  },
});
