import { atom } from 'recoil';
import { TagDataType } from '../../../utils/types/tags/tags';

export const userTagState = atom({
  key: 'selectedUserTags',
  default: [] as TagDataType[],
});
