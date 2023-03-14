import { atom } from 'recoil';
import { profileUser } from '../../dummy/users';
import { TagDataType } from '../../utils/types/tags/tags';

export const userTagState = atom({
  key: 'selectedUserTags',
  default: profileUser.tag as TagDataType[],
});
