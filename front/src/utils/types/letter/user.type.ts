export type LetterUserData = {
  profile: string | null;
  name: string;
  id: string | number;
  location: string;
  lastLetter: {
    status: 'SENT' | 'RECEIVED';
    createdAt: string;
    read: boolean;
  };
};
