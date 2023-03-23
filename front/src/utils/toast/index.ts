import { toast as ReactToastify, ToastOptions } from 'react-toastify';

// 공통 옵션 적용
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: false,
  progress: undefined,
  theme: 'light',
};

export const toast = {
  default: (messeage: string, options?: ToastOptions) => {
    return ReactToastify(messeage, { ...defaultOptions, ...options });
  },
  success: (messeage: string, options?: ToastOptions) => {
    return ReactToastify.success(messeage, { ...defaultOptions, ...options });
  },
  info: (messeage: string, options?: ToastOptions) => {
    return ReactToastify.info(messeage, { ...defaultOptions, ...options });
  },
  warning: (messeage: string, options?: ToastOptions) => {
    return ReactToastify.warning(messeage, { ...defaultOptions, ...options });
  },
  error: (messeage: string, options?: ToastOptions) => {
    return ReactToastify.error(messeage, { ...defaultOptions, ...options });
  },
};
