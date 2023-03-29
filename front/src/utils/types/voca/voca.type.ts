import { LANGUAGE_CODE } from '../../enums';

export type VocaDataType = {
  vocabId: number;
  word: string;
  meaning: string;
  nation: string | LANGUAGE_CODE;
  createdAt?: string;
};

export type vocaListStateType = {
  content: VocaDataType[];
  isStop: boolean;
};
