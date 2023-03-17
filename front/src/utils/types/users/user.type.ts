import { GENDER_TYPE, LOCATION_CODE, USER_STATUS } from '../../enums';
import { LanguageDataType } from '../common/common.type';
import { TagDataType } from '../tags/tags';

export type UserData = {
  memberId: number;
  email: string;
  name: string;
  gender: GENDER_TYPE;
  location?: LOCATION_CODE | null;
  birthday?: string;
  language: LanguageDataType[];
  tag?: TagDataType[];
  introduce?: string;
  profile?: string | null;
  memberStatus?: USER_STATUS;
  friend?: boolean;
};

type Language = {
  nation: string;
  level: number;
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type BlackUserData = {
  memberId: number;
  name: string;
  location: LOCATION_CODE;
  profile: string | null;
};

export type SearchUserDataType = BlackUserData & {
  friend: boolean;
};
