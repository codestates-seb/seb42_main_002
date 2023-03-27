import axios from 'axios';
import { getCookie } from '../cookie';
import { toast } from '../toast';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000, // 요청 타임아웃(ms)
  // headers: {
  //   'Content-Type': 'application/json', // 요청 헤더
  // },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie('accessJwtToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return new Promise((resolve, reject) => {
      if (error.response.status === 401 && error.config) {
        toast.error('로그인에 실패하였습니다');
        if (window.location.pathname !== '/login') {
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
        }
        return;
      }
      if (error.response.status === 404 && error.config) {
        toast.error(error.response.data.message || '요청에 실패하였습니다');
        throw new Error(error.response.data.message || '요청에 실패하였습니다');
      }

      toast.error(error.response.data.message || '다시 시도해주세요');
      throw new Error(error.response.data.message || '다시 시도해주세요');
    });
  }
);
