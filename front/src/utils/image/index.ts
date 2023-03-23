import defaultProfileError from '../../assets/img/common/default_owls_error.svg';

export const onErrorImage = (
  event: React.ChangeEvent<HTMLImageElement>,
  replaceImage?: string
) => {
  event.target.src = replaceImage || defaultProfileError;
};
