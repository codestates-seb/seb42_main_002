import { LANGUAGE_CODE } from './../../enums/common/common.enum';
export type TagDataType = {
  tagId: number;
  name: string;
  englishName?: string;
  alpha?: string;
};

export type LangTagDataType = {
  languageId?: number;
  name?: string;
  englishName: string;
  nation: LANGUAGE_CODE;
  filterTag: string;
};
