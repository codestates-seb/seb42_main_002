import { ReactNode } from 'react';

export type RouterElement = {
  path: string;
  element: ReactNode;
  isAuth: boolean;
  isFirstLogin?: boolean;
  meta?: RouterMetaElement;
  children?: RouterElement[];
};

export type RouterMetaElement = {
  title?: string;
  subTitle?: string;
};
