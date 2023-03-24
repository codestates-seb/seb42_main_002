import { GENDER_TYPE, LOCATION_CODE, USER_STATUS } from '../../enums';
import { LanguageDataType } from '../common/common.type';
import { LetterUserData } from '../letter';
import { TagDataType } from '../tags/tags';

export type UserData = {
  memberId: number;
  email: string;
  name: string;
  gender: GENDER_TYPE | null;
  location?: LOCATION_CODE | null;
  birthday?: string | null;
  language: LanguageDataType[];
  tag?: TagDataType[];
  introduce?: string;
  profile?: string | null;
  memberStatus?: USER_STATUS;
  friend?: boolean;
  block?: boolean;
};

export type BlackUserDataType = {
  memberId: number;
  name: string;
  location: LOCATION_CODE;
  profile: string | null;
};

export type blackListStateType = {
  content: BlackUserDataType[];
  isStop: boolean;
};

export type FollowingListStateType = {
  content: LetterUserData[];
  isStop: boolean;
};

export type SearchUserDataType = BlackUserDataType & {
  friend: boolean;
};
