import { UserProfileData } from './../utils/types/users';
import { UserData } from '../utils';
import {
  GENDER_TYPE,
  LANGUAGE_CODE,
  LOCATION_CODE,
  USER_STATUS,
} from '../utils/enums';
import { SignInData } from '../utils/types/auth';

export const signInUser: SignInData = {
  email: 'rockbell89',
  password: '1234',
};

export const userProfile: UserProfileData = {
  memberId: 1,
  name: '안아영',
  email: '12ayo22@gmail.com',
  gender: 'OTHER',
  location: 'KR',
  birthday: '2023-02-28',
  introduce: '멋진 프론트엔드 개발자 아영입니다!',
  profile: null,
  createdAt: '2023-02-28T19:12:01',
  language: [
    {
      nation: 'KR',
      level: 5,
    },
    {
      nation: 'EN',
      level: 2,
    },
  ],
  tag: ['음악', '댄스'],
};

export const profileUser: UserData = {
  memberId: 1,
  name: '록벨',
  email: 'rockbell89@gmail.com',
  gender: GENDER_TYPE.MALE,
  location: LOCATION_CODE.KR,
  birthday: '2022-03-06',
  profile: null,
  introduce: '안녕하세요~ 반갑습니다~~!',
  language: [
    {
      languageId: 1,
      nation: LANGUAGE_CODE.KO,
      level: 1,
    },
    {
      languageId: 2,
      nation: LANGUAGE_CODE.JA,
      level: 2,
    },
    {
      languageId: 3,
      nation: LANGUAGE_CODE.EN,
      level: 3,
    },
  ],
  tag: [
    {
      tagId: 1,
      name: '코딩',
    },
    {
      tagId: 13,
      name: '음악',
    },
  ],
  memberStatus: USER_STATUS.MEMBER_ACTIVE,
  friend: true,
};
