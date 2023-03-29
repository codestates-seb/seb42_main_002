import { DefaultValue, selector } from 'recoil';
import { PATCH } from '../../../utils/axios';
import { userLocationState } from '../../atoms';

export const userLocationSeletor = selector({
  key: 'userLocation/patch',
  get: async ({ get }) => {
    const data = get(userLocationState);
    try {
      const response = await PATCH('/users/me', {
        location: data,
      });
      if (!response) throw Error;
      if (response) return data;
    } catch (error: any) {
      console.error(error && error?.response.data.message);
      // window.location.reload();
      throw new Error('태그수정 GET API 에러');
      return error;
    }
    return [];
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(userLocationState, null);
    } else {
      set(userLocationState, newValue);
    }
  },
});
