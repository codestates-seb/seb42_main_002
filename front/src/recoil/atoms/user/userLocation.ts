import { atom } from 'recoil';
import { LOCATION_CODE } from '../../../utils';

export const userLocationState = atom<LOCATION_CODE | null | undefined>({
  key: 'userLocationState',
  default: null,
});

export const userLocationValueState = atom({
  key: 'userLocationValueState',
  default: null,
});
