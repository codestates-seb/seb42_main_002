export type LetterData = {
  letterId: number;
  sender: {
    memberId: number;
    name: string;
  };
  receiver: {
    memberId: number;
    name: string;
  };
  // title: string; // 이게 어디서 쓰이는거지
  body: string;
  isRead: boolean; // 읽음 여부
  availableAt: string;
  canRead: boolean;
  createdAt: string;
  hasPic: boolean; // 이미지 첨부 여부
};

export type SeletedLetterData = {
  letterId: number;
  sender: string;
  receiver: string;
  body: string;
  availableAt: string;
  createdAt: string;
  pic: string[];
};
