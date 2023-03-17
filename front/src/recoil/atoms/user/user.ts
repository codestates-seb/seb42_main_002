import { atom } from 'recoil';
import { profileUser } from '../../../dummy/users';
import { UserData } from '../../../utils';

export const userState = atom({
  key: 'userState',
  default: profileUser as UserData,
});

export const userFirstState = atom({
  key: 'userFirstState',
  default: null,
});
