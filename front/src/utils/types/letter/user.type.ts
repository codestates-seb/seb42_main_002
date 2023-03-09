export type LetterUserData = {
  profile: string | null;
  name: string;
  memberId: number;
  location: string;
  lastLetter: {
    status: 'SENT' | 'RECEIVED';
    createdAt: string;
    isRead: boolean;
  };
};
