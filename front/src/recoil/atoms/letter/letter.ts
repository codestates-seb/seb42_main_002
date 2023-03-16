import { LOCATION_CODE } from './../../../utils/enums/common/common.enum';
import { LetterUserCardProps } from './../../../components/Letter/LetterUserCard/LetterUserCard';
import { atom } from 'recoil';

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
