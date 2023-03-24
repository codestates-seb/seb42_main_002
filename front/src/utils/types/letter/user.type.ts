import { LOCATION_CODE } from './../../enums/common/common.enum';
export type LetterUserData = {
  profile: string | null;
  name: string;
  memberId: number;
  location: LOCATION_CODE;
  birthday?: string;
  memberStatus?: string;
  lastLetter: {
    status: 'SENT' | 'RECEIVED';
    createdAt: string;
    isRead: boolean;
  };
};
