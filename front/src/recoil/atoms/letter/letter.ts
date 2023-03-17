import { atom } from 'recoil';

import { newLetterType } from './../../../utils/types/letter/letter.type';
import { LOCATION_CODE } from './../../../utils/enums/common/common.enum';
import { LetterUserCardProps } from './../../../components/Letter/LetterUserCard/LetterUserCard';

type selectedUserInfo = LetterUserCardProps;

export const selectedUserInfo = atom<selectedUserInfo>({
  key: 'selectedUserInfo',
  default: {
    birthday: String(new Date()),
    location: 'KR' as LOCATION_CODE,
    name: '',
    profile: '',
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
