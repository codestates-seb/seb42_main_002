import { toast } from '../toast';
import defaultProfileError from '../../assets/img/common/default_owls_error.svg';

/**
 * 이미지 onError 대체 이미지
 * @param event
 * @param replaceImage
 */
export const onErrorImageHandler = (
  event: React.ChangeEvent<HTMLImageElement>,
  replaceImage?: string
) => {
  event.target.src = replaceImage || defaultProfileError;
};

/**
 *  이미지 용량 및 확장자 체크
 */
const LIMIT_SIZE = 1024 ** 5; // 5MB
const EXTEND_FILE = ['image/jpeg', 'image/png', 'image/gif'];

export const checkUploadsSize = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (event.target.files && event.target.files[0].size > LIMIT_SIZE) {
    toast.error('파일 용량은 5MB 이하만 가능합니다');
    return;
  }
  return true;
};

export const checkUploadsExtendName = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (
    event.target.files &&
    event.target.files[0].type &&
    !EXTEND_FILE.includes(event.target.files[0].type)
  ) {
    toast.error('jpg, jpeg, png, gif 파일만 가능합니다');
    return;
  }
  return true;
};
