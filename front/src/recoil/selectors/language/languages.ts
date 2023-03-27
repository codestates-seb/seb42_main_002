import { selector } from 'recoil';
import { languageTags } from '../../../dummy/languages';
import { GET } from '../../../utils/axios';
import { LangTagDataType } from '../../../utils/types/tags/tags';

export const allLanguageState = selector<LangTagDataType[]>({
  key: 'languages/get',
  get: async () => {
    try {
      const { data } = await GET('/languages');
      const map = new Map();
      data.forEach((lang: LangTagDataType) => map.set(lang.nation, lang));
      languageTags.forEach((lang: any) =>
        map.set(lang.nation, { ...map.get(lang.nation), ...lang })
      );
      const mergedData = Array.from(map.values());
      return mergedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});
