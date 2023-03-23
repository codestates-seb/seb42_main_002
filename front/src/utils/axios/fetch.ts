import { AxiosRequestConfig } from 'axios';
import { instance } from './instanse';

const defaultOptions: AxiosRequestConfig<any> = {
  headers: {
    'Content-Type': 'application/json', // 요청 헤더
  },
};

export const GET = (
  url: string,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.get(url, options);
};

export const POST = (
  url: string,
  data: any,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  const formmated = JSON.stringify(data);
  return instance.post(url, formmated, options);
};

export const POST_IMG = (
  url: string,
  data: any,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.post(url, data, options);
};

export const PATCH = (
  url: string,
  data: any,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  const formmated = JSON.stringify(data);
  return instance.patch(url, formmated, options);
};

export const DELETE = (
  url: string,
  options: AxiosRequestConfig<any> = defaultOptions
) => {
  return instance.delete(url, options);
};
