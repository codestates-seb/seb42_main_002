import { atom } from 'recoil';
import { UserData } from '../../../utils';

export const userState = atom<UserData | null>({
  key: 'userState',
  default: null,
});
