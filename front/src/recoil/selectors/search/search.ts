import { selector } from 'recoil';
import { LanguageDataType } from '../../../utils';
import { GET } from '../../../utils/axios';
import { TagDataType } from '../../../utils/types/tags/tags';
import {
  searchUserListState,
  selectedSearchLangTagState,
  selectedSearchTagState,
} from '../../atoms';
import { pageNationState } from '../../atoms/pagination';

/**
 * @description 검색 유저 리스트 selector
 */
export const searchUserListSeletor = selector({
  key: 'searchUserList/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const searchTags = get(selectedSearchTagState);
    const searchLangTags = get(selectedSearchLangTagState);
    const { content, isStop } = get(searchUserListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const tags = searchTags.map((tag: TagDataType) => tag.name).join('+');
      const langs = searchLangTags
        .map((tag: LanguageDataType) => tag.nation)
        .join('+');

      const params = new URLSearchParams();
      params.append('tag', tags);
      params.append('lang', langs);
      params.append('page', String(page));
      params.append('size', '10');
      const queryString = params.toString();
      const { data } = await GET(`/users/search?${queryString}`);
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
