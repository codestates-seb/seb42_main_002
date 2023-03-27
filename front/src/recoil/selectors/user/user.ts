import { selector, selectorFamily } from 'recoil';
import { UserData } from '../../../utils';
import { GET, PATCH } from '../../../utils/axios';
import { userState } from '../../atoms';
import { rerenderingTriggerState } from '../../atoms/common';

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

/**
 * @description 추천 유저 GET
 */
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

export const otherUserSelector = selectorFamily<UserData | null, string>({
  key: 'otherUser/get',
  get:
    (memberId: string) =>
    async ({ get }) => {
      get(rerenderingTriggerState);
      if (!memberId) return null;
      try {
        const { data, status } = await GET(`/users/${memberId}`);
        if (status === 200 && data) {
          return data as UserData;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
});
