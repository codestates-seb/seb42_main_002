import { DefaultValue, selector } from 'recoil';
import { PATCH } from '../../../utils/axios';
import { userTagState } from '../../atoms';

export const userTagSeletor = selector({
  key: 'userTag/patch',
  get: async ({ get }) => {
    const data = get(userTagState);
    const requestData = data.map((tag) => tag.name);
    try {
      const response = await PATCH('/users/me', {
        tag: requestData,
      });
      if (!response) throw Error;
      if (response) return data;
    } catch (error: any) {
      alert(error && error?.response.data.message);
      return error;
    }
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(userTagState, []);
    } else {
      set(userTagState, newValue);
    }
  },
});
