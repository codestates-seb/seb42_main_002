import { LOCATION_CODE } from './../utils/enums/common/common.enum';
import { SearchUserDataType } from './../utils/types/users/user.type';
export const searchUserData: SearchUserDataType[] = [
  {
    memberId: 1,
    name: '안아영',
    profile: null,
    location: LOCATION_CODE.KR,
    friend: true,
  },
  {
    memberId: 2,
    name: 'test',
    profile: null,
    location: LOCATION_CODE.KR,
    friend: false,
  },
];
