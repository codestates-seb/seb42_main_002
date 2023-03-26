export type LetterDataType = {
  letterId: number;
  sender: {
    memberId: number;
    name: string;
  };
  receiver: {
    memberId: number;
    name: string;
  };
  body: string;
  isRead: boolean; // 읽음 여부
  availableAt: string;
  createdAt: string;
  hasPic: boolean; // 이미지 첨부 여부
};

export type LetterListStateType = {
  content: LetterDataType[];
  isStop: boolean;
};

export type SeletedLetterDataType = {
  letterId?: number;
  sender: string;
  type: number;
  receiver: string;
  body: string;
  availableAt: string;
  createdAt: string;
  photoUrl: string[] | null;
  memberStatus?: string;
};

/**
 * @description 편지 생성 type
 */
export type newLetterType = {
  body: string;
  photoUrl: string[];
  type?: number;
  receiver: string;
  memberId: null | number;
};
