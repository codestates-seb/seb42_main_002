import { selector } from 'recoil';
import { UserData } from '../../../utils';
import { PATCH } from '../../../utils/axios';
import { userState } from '../../atoms';

export const userSeletor = selector<UserData>({
  key: 'user/patch',
  get: async ({ get }) => {
    const data = get(userState);
    try {
      const response = await PATCH('/members', {
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
