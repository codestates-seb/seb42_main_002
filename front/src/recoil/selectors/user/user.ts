import { selector } from 'recoil';
import { UserData } from '../../../utils';
import { GET, PATCH } from '../../../utils/axios';
import { userState } from '../../atoms';

export const userSeletor = selector<UserData>({
  key: 'user/patch',
  get: async ({ get }) => {
    const data = get(userState);
    try {
      const response = await PATCH('/users/me', {
        ...data,
      });
      if (!response) throw Error;
      if (response) return data;
    } catch (error: any) {
      alert(error && error?.response.data.message);
      // window.location.reload();
      return error;
    }
    return null;
  },
  set: ({ set }, newValue) => {
    set(userState, newValue);
  },
});

export const recomandUserSelector = selector({
  key: 'recomandUser/get',
  get: async () => {
    try {
      const { data, status } = await GET('/users/me/recommend');
      if (status === 200 && data) {
        return data.content.slice(0, 10);
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  },
});
