import defaultProfileError from '../../assets/img/common/default_owls_error.svg';

export const onErrorImageHandler = (
  event: React.ChangeEvent<HTMLImageElement>,
  replaceImage?: string
) => {
  event.target.src = replaceImage || defaultProfileError;
};
