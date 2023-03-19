import { LanguageDataType } from '../utils';
import { LANGUAGE_CODE } from '../utils/enums/common/common.enum';

// 언어 코드
export const languageTags: LanguageDataType[] = [
  {
    languageId: 1,
    name: '한국어',
    englishName: 'Korean',
    nation: LANGUAGE_CODE.KO,
    filterTag: '한국어 Korean',
  },
  {
    languageId: 2,
    name: 'English',
    englishName: 'English',
    nation: LANGUAGE_CODE.EN,
    filterTag: 'English 영어',
  },
  {
    languageId: 3,
    name: '中文',
    englishName: 'Chinese',
    nation: LANGUAGE_CODE.CN,
    filterTag: '中文 Chinese 중국어',
  },
  {
    languageId: 4,
    name: '日本語',
    englishName: 'Japanese',
    nation: LANGUAGE_CODE.JA,
    filterTag: '日本語 Japanese 일본어',
  },
  {
    languageId: 5,
    name: 'Español',
    englishName: 'Spanish',
    nation: LANGUAGE_CODE.ES,
    filterTag: 'Español Spanish 스페인어',
  },
  {
    languageId: 6,
    name: 'français',
    englishName: 'French',
    nation: LANGUAGE_CODE.FR,
    filterTag: 'français French 프랑스어',
  },
  {
    languageId: 7,
    name: 'Italiano',
    englishName: 'Italian',
    nation: LANGUAGE_CODE.IT,
    filterTag: 'Italiano Italian 이탈리아어',
  },
  {
    languageId: 8,
    name: 'Русский',
    englishName: 'Russian',
    nation: LANGUAGE_CODE.RU,
    filterTag: 'Русский Russian 러시아어',
  },
  {
    languageId: 9,
    name: 'Türkçe',
    englishName: 'Turkish',
    nation: LANGUAGE_CODE.TR,
    filterTag: 'Türkçe Turkish 터키어',
  },
  {
    languageId: 10,
    name: 'Deutsch',
    englishName: 'German',
    nation: LANGUAGE_CODE.DE,
    filterTag: 'Deutsch German 독일어',
  },
];

// 언어 레벨
export const languageLevels = [
  {
    level: 1,
    text: '관심 있음',
  },
  {
    level: 2,
    text: '초급 수준',
  },
  {
    level: 3,
    text: '중급 수준',
  },
  {
    level: 4,
    text: '고급 수준',
  },
  {
    level: 5,
    text: '원어민 수준',
  },
];
