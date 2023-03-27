import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { letterUserListState, selectedUserInfoState } from '../../atoms';
import { letterPagiNationState, pageNationState } from '../../atoms/pagination';

export const letterUserListSeletor = selector({
  key: 'letterUser/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const { content, isStop } = get(letterUserListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(
        `/users/me/letters/inbox?page=${page}&size=10`
      );
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

export const letterListSeletor = selector({
  key: 'letterList/get',
  get: async ({ get }) => {
    const page = get(letterPagiNationState);

    const seletedUser = get(selectedUserInfoState);
    const { content, isStop } = get(letterUserListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(
        `users/me/letters?target=${seletedUser.memberId}&page=${page}&size=10`
      );
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

export const arrivedLetterCountSelector = selector({
  key: 'arrivedLetter/get',
  get: async () => {
    try {
      const { data, status } = await GET('/users/me/letters/arrived');
      if (status === 200 && data) {
        return data.count;
      }
    } catch (error) {
      console.error(error);
    }
    return 0;
  },
});
