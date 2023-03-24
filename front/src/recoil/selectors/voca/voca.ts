import { selector } from 'recoil';
import { toast } from '../../../utils';
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
      toast.error('네트워크 오류가 발생했습니다.');
    }
    return {
      content: [],
      isStop: false,
    };
  },
});
