import { atom } from 'recoil';
import { FollowingListStateType } from '../../../utils';

export const followingListState = atom<FollowingListStateType>({
  key: 'followingListState',
  default: {
    content: [],
    isStop: false,
  },
});
