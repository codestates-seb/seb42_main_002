import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { selectedSearchTagState } from '../../atoms';

/**
 * @description 프로필 정보를 가져오는 API, TODO: 나중에 변경 예정
 */
export const searchUserTagSelector = selector({
  key: 'searchTag',
  get: async ({ get }) => {
    const tags = get(selectedSearchTagState);
    if (tags.length === 0) {
      try {
        const { data } = await GET('/users/me');
        return data.tag;
      } catch (err) {
        // TODO: 에러 처리하기
        console.log(err);
      }
    }
    return tags;
  },
  set: ({ set }, newValue) => {
    set(selectedSearchTagState, newValue);
  },
});
