import { atom } from 'recoil';
import { UserData } from '../../../utils';

export const userState = atom<UserData | null | any>({
  key: 'userState',
  default: ({} as UserData) || null,
});
