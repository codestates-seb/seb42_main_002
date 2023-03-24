import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { letterUserListState } from '../../atoms';
import { pageNationState } from '../../atoms/pagination';

export const letterUserListSeletor = selector({
  key: 'letterUser/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const { content, isStop } = get(letterUserListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(
        `/users/me/letters/inbox?page=${page}&size=10`
      );
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
