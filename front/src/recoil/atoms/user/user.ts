import { atom } from 'recoil';
import { SearchUserListStateType, UserData } from '../../../utils';

export const userState = atom<UserData | null>({
  key: 'userState',
  default: null,
});

/**
 * @description 검색 결과 유저 리스트
 */
export const searchUserListState = atom<SearchUserListStateType>({
  key: 'searchUserListState',
  default: {
    content: [],
    isStop: false,
  },
});
