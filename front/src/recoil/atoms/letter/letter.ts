import { atom } from 'recoil';

import {
  newLetterType,
  SeletedLetterDataType,
} from './../../../utils/types/letter/letter.type';
import { LOCATION_CODE } from './../../../utils/enums/common/common.enum';
import { LetterUserCardProps } from './../../../components/Letter/LetterUserCard/LetterUserCard';

type selectedUserInfo = LetterUserCardProps;

export const selectedUserInfoState = atom<selectedUserInfo>({
  key: 'selectedUserInfoState',
  default: {
    birthday: String(new Date()),
    location: 'KR' as LOCATION_CODE,
    name: '',
    profile: '',
    memberId: null,
  },
});

/**
 * @description 새로 만드는 편지 데이터
 */
export const newLetterState = atom<newLetterType>({
  key: 'newLetterState',
  default: {
    photoUrl: [],
    body: '',
    type: 0, // 일단 0으로 고정
    receiver: '',
    memberId: null,
  },
});

/**
 * @description 현재 조회중인 편지 데이터
 */
export const selectedLetterState = atom<SeletedLetterDataType>({
  key: '',
  default: {
    // letterId,
    sender: '',
    receiver: '',
    type: 1,
    body: '',
    availableAt: String(new Date()),
    createdAt: String(new Date()),
    photoUrl: null,
  },
});

/**
 * @description 선택한 이미지 순서 데이터
 */

export const selectedPictureIdx = atom<number>({
  key: 'selectedPictureIdx',
  default: 0,
});
