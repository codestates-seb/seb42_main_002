import { LanguageDataType } from '../utils';
import { LANGUAGE_CODE } from '../utils/enums/common/common.enum';

export const nationalityTags = [
  { id: 1, name: '한국', flag: 'KOREA', alpha: 'KR' },
  { id: 2, name: '미국', flag: 'English', alpha: 'EN' },
  { id: 3, name: '중국', flag: 'Simplified Chinese', alpha: 'ZH-CN' },
  { id: 4, name: '일본', flag: 'Japanese', alpha: 'JA' },
  { id: 5, name: '스페인', flag: 'Spanish', alpha: 'ES' },
];

export const languageTags = [
  {
    id: 1,
    name: '한국어',
    englishName: 'Korean',
    nation: LANGUAGE_CODE.KO,
    filterTag: '한국어 Korean',
  },
  {
    id: 2,
    name: 'English',
    englishName: 'English',
    nation: LANGUAGE_CODE.ES,
    filterTag: 'English 영어',
  },
  {
    id: 3,
    name: '中文',
    englishName: 'Chinese',
    nation: LANGUAGE_CODE.CN,
    filterTag: '中文 Chinese 중국어',
  },
  {
    id: 4,
    name: '日本語',
    englishName: 'Japanese',
    nation: LANGUAGE_CODE.JA,
    filterTag: '日本語 Japanese 일본어',
  },
  {
    id: 5,
    name: 'Español',
    englishName: 'Spanish',
    nation: LANGUAGE_CODE.ES,
    filterTag: 'Español Spanish 스페인어',
  },
];

export const hobbyTags = [
  { id: 1, name: '코딩' },
  { id: 2, name: '게임' },
  { id: 3, name: '일러스트' },
  { id: 4, name: '테크' },
  { id: 5, name: '언어' },
  { id: 6, name: '영화' },
  { id: 7, name: '반려 동물' },
  { id: 8, name: '자연' },
  { id: 9, name: '환경' },
  { id: 10, name: '글쓰기' },
  { id: 11, name: '뷰티' },
  { id: 12, name: '헬스' },
  { id: 13, name: '음악' },
  { id: 14, name: '춤' },
  { id: 15, name: '디자인' },
  { id: 16, name: '패션' },
  { id: 17, name: '자동차' },
  { id: 18, name: '건축' },
  { id: 19, name: '여행' },
  { id: 20, name: '사진' },
  { id: 21, name: '요리' },
  { id: 22, name: '경제' },
  { id: 23, name: '주식' },
  { id: 24, name: 'SF&미래' },
  { id: 25, name: '교육' },
  { id: 26, name: '가족' },
  { id: 27, name: '육아' },
  { id: 28, name: '역사' },
  { id: 29, name: '철학' },
  { id: 30, name: '과학' },
  { id: 31, name: '종교' },
  { id: 32, name: '정치' },
  { id: 33, name: '소설' },
  { id: 34, name: '문화' },
  { id: 35, name: '스포츠' },
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
