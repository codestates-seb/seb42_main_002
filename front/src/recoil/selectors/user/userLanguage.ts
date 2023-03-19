import { DefaultValue, selector } from 'recoil';
import { PATCH } from '../../../utils/axios';
import { userLanguageState } from '../../atoms';

export const userLanguageSeletor = selector({
  key: 'userLanguage/patch',
  get: async ({ get }) => {
    const data = get(userLanguageState);
    try {
      const response = await PATCH('/members', {
        language: data,
      });
      if (!response) throw Error;
      if (response) return data;
    } catch (error: any) {
      alert(error && error?.response.data.message);
      window.location.reload();
      return error;
    }
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(userLanguageState, []);
    } else {
      set(userLanguageState, newValue);
    }
  },
});
