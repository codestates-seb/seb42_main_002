import { UserData } from '../utils';
import { GENDER_TYPE, LANGUAGE_CODE, USER_STATUS } from '../utils/enums';
import { SignInData } from '../utils/types/auth';

export const profileUser: UserData = {
  memberId: 1,
  name: '록벨',
  email: 'rockbell89@gmail.com',
  gender: GENDER_TYPE.MALE,
  location: null,
  birthday: '2022-03-06',
  profile: null,
  introduce: '안녕하세요~ 반갑습니다~~!',
  language: [
    // {
    //   languageId: 1,
    //   nation: LANGUAGE_CODE.KO,
    //   level: 1,
    // },
    // {
    //   languageId: 2,
    //   nation: LANGUAGE_CODE.JA,
    //   level: 2,
    // },
    // {
    //   languageId: 3,
    //   nation: LANGUAGE_CODE.EN,
    //   level: 3,
    // },
  ],
  tag: [
    // {
    //   tagId: 1,
    //   name: '코딩',
    // },
    // {
    //   tagId: 13,
    //   name: '음악',
    // },
  ],
  memberStatus: USER_STATUS.MEMBER_ACTIVE,
  friend: true,
};
