import { instance } from './instanse';

export const GET = (url: string) => {
  return instance.get(url);
};

export const POST = (url: string, data: any) => {
  const formmated = JSON.stringify(data);
  return instance.post(url, formmated);
};

export const PATCH = (url: string, data: any) => {
  const formmated = JSON.stringify(data);
  return instance.patch(url, formmated);
};

export const DELETE = (url: string) => {
  return instance.delete(url);
};
