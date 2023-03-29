import { toast } from '../toast';
import imageCompression from 'browser-image-compression';
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
 *  이미지 용량  체크
 */

const LIMIT_SIZE = 1024 ** 5; // 5MB

const checkUploadsSize = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const compressedFile = await imageCompress(event);
  if (compressedFile && compressedFile.size > LIMIT_SIZE) {
    toast.error('파일 용량은 5MB 이하만 가능합니다');
    return;
  }
  return true;
};

/**
 * 이미지 확장자 체크
 * @param event
 * @returns
 */

const EXTEND_FILE = ['image/jpeg', 'image/png'];

const checkUploadsExtendName = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (
    event.target.files &&
    event.target.files[0].type &&
    !EXTEND_FILE.includes(event.target.files[0].type)
  ) {
    toast.error('jpg, jpeg, png 파일만 가능합니다');
    return;
  }
  return true;
};

/**
 * 이미지 압축
 * @param event
 * @returns
 */
const imageCompress = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files && event.target.files[0];
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  if (file) {
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 *  이미지 용량 및 확장자 유호성 체크
 * @param event
 * @returns
 */
export const validateUploadImage = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const compressedFile = await imageCompress(event);
  return {
    isValid: checkUploadsExtendName(event) && checkUploadsSize(event),
    file: compressedFile,
  };
};
