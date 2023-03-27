import { selector } from 'recoil';
import { GET } from '../../../utils/axios';
import { VocaDataType } from '../../../utils/types/voca';
import { pageNationState } from '../../atoms/pagination';
import { vocaListState } from '../../atoms/voca';

export const vocaSeletor = selector({
  key: 'voca/get',
  get: async ({ get }) => {
    const page = get(pageNationState);
    const { content, isStop } = get(vocaListState);
    if (isStop) {
      return {
        content,
        isStop,
      };
    }

    try {
      const { data } = await GET(`/vocabs?page=${page}&size=10`);
      const formattedVacaList = data.content.map((voca: VocaDataType) => ({
        vocabId: voca.vocabId,
        meaning: voca.meaning,
        word: voca.word,
        nation: voca.nation,
      }));

      return {
        content: formattedVacaList, // 최신 데이터만
        isStop: data.last, // 끝 여부
      };
    } catch (error: unknown) {
      console.error(error);
      throw new Error('단어 GET API 에러');
    }
  },
});

export const randomVocaSelector = selector<VocaDataType>({
  key: 'randomVoca/get',
  get: async () => {
    try {
      const { data } = await GET('/vocabs/random');
      if (data) {
        return data;
      }
    } catch (error) {
      console.error(error);
      throw new Error('단어 GET API 에러');
    }
    return null;
  },
});
