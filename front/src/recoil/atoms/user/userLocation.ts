import { atom } from 'recoil';
import { profileUser } from '../../../dummy/users';

export const userLocationState = atom({
  key: 'selectedUserLocation',
  default: profileUser.location ? profileUser.location : null,
});
