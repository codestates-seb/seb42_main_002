import { selector } from 'recoil';
import { GET } from '../../../utils/axios';

export const allTagState = selector({
  key: 'tags/get',
  get: async () => {
    try {
      const { data } = await GET('/tags');
      return data;
    } catch (error) {
      console.log(error);
      throw new Error('태그 GET API 에러');
    }
  },
});
