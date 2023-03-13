import { UserProfileData } from './../utils/types/users';
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
