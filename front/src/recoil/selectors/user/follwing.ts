import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { pageNationState } from '../../atoms/pagination';
import { followingListState } from '../../atoms/user/following';

export const followingListSeletor = selector({
  key: 'following/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const { content, isStop } = get(followingListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(`/users/me/follows?page=${page}&size=10`);
      return {
        content: data.content, // 최신 데이터만
        isStop: data.last, // 끝 여부
      };
    } catch (error: unknown) {
      console.error(error);
    }
    return {
      content: [],
      isStop: false,
    };
  },
});
