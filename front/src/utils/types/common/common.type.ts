import { ReactNode } from 'react';
import { LANGUAGE_CODE } from '../../enums/common/common.enum';

export type DefaultProps = {
  children?: ReactNode;
  className?: string;
};

export type LanguageDataType = {
  nation: LANGUAGE_CODE;
  level: number | string;
};
