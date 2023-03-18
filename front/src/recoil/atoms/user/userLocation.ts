import { atom } from 'recoil';
import { LOCATION_CODE } from '../../../utils';

export const userLocationState = atom<LOCATION_CODE | null | undefined>({
  key: 'selectedUserLocation',
  default: null,
});
