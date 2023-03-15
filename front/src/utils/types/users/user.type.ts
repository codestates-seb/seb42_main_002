import {GENDER_TYPE} from '../../enums/common/common.enum';
import {LanguageDataType} from '../common/common.type';
import {TagDataType} from '../tags/tags';

export type UserData = {
  memberId: number;
  email: string;
  name: string;
  gender: GENDER_TYPE;
  location?: string;
  birthday?: string;
  language: LanguageDataType[];
  tag?: TagDataType[];
  introduce?: string;
  profile?: string | null;
  memberStatus?: string;
  selectedLevelValue?: number | string | null;
  selectedNationValue?: number | string | null;
  selectedLanguage?: any;
};

type Language = {
  nation: string;
  level: number;
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type UserProfileData = {
  memberId: number;
  name: string;
  email: string;
  gender: Gender;
  location: string;
  birthday: string;
  introduce: string;
  profile: string | null;
  createdAt: string;
  language: Language[];
  tag: string[];
};

export type BlackUserData = {
  memberId: number;
  name: string;
  location: string;
  profile: string | null;
};
