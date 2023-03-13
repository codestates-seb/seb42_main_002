export type UserData = {
  email: string;
  displayName: string;
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
