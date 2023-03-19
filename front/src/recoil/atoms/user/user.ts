import { atom } from 'recoil';
import { UserData } from '../../../utils';

export const userState = atom<UserData>({
  key: 'userState',
  default: {} as UserData,
});

export const userLocationValueState = atom({
  key: 'userLocationValueState',
  default: null,
});
