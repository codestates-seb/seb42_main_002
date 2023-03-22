import { atom } from 'recoil';
import { VocaDataType } from '../../../utils/types/voca';

export const selectedVocaState = atom<VocaDataType>({
  key: 'selectedVocaState',
  default: {
    vocabId: 0,
    word: '',
    meaning: '',
    nation: '',
  },
});

export const deleteVocaState = atom<number | null>({
  key: 'deleteVocaState',
  default: null,
});
