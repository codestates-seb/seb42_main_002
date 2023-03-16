import { LanguageDataType } from '../utils';
import { LANGUAGE_CODE } from '../utils/enums/common/common.enum';

export const nationalityTags = [
  { tagId: 1, name: '한국', flag: 'KOREA', alpha: 'KR' },
  { tagId: 2, name: '미국', flag: 'English', alpha: 'EN' },
  { tagId: 3, name: '중국', flag: 'Simplified Chinese', alpha: 'ZH-CN' },
  { tagId: 4, name: '일본', flag: 'Japanese', alpha: 'JA' },
  { tagId: 5, name: '스페인', flag: 'Spanish', alpha: 'ES' },
];

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
];

export const hobbyTags = [
  { tagId: 1, name: '코딩' },
  { tagId: 2, name: '게임' },
  { tagId: 3, name: '일러스트' },
  { tagId: 4, name: '테크' },
  { tagId: 5, name: '언어' },
  { tagId: 6, name: '영화' },
  { tagId: 7, name: '반려 동물' },
  { tagId: 8, name: '자연' },
  { tagId: 9, name: '환경' },
  { tagId: 10, name: '글쓰기' },
  { tagId: 11, name: '뷰티' },
  { tagId: 12, name: '헬스' },
  { tagId: 13, name: '음악' },
  { tagId: 14, name: '춤' },
  { tagId: 15, name: '디자인' },
  { tagId: 16, name: '패션' },
  { tagId: 17, name: '자동차' },
  { tagId: 18, name: '건축' },
  { tagId: 19, name: '여행' },
  { tagId: 20, name: '사진' },
  { tagId: 21, name: '요리' },
  { tagId: 22, name: '경제' },
  { tagId: 23, name: '주식' },
  { tagId: 24, name: 'SF&미래' },
  { tagId: 25, name: '교육' },
  { tagId: 26, name: '가족' },
  { tagId: 27, name: '육아' },
  { tagId: 28, name: '역사' },
  { tagId: 29, name: '철학' },
  { tagId: 30, name: '과학' },
  { tagId: 31, name: '종교' },
  { tagId: 32, name: '정치' },
  { tagId: 33, name: '소설' },
  { tagId: 34, name: '문화' },
  { tagId: 35, name: '스포츠' },
];

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
