import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { blackListState } from '../../atoms';
import { pageNationState } from '../../atoms/pagination';

export const blackListSeletor = selector({
  key: 'blackList/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const { content, isStop } = get(blackListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(`/users/me/blocks?page=${page}&size=10`);
      return {
        content: data.content, // 최신 데이터만
        isStop: data.last, // 끝 여부
      };
    } catch (error: unknown) {
      console.error(error);
      throw new Error('블랙리스트 GET API 에러');
    }
  },
});
