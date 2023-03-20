import { ReactNode } from 'react';
import { LANGUAGE_CODE, LOCATION_CODE } from '../../enums/common/common.enum';
import FlagIconKR from '../../../assets/img/flags/flag_kr.svg';
import FlagIconJP from '../../../assets/img/flags/flag_jp.svg';
import FlagIconCN from '../../../assets/img/flags/flag_cn.svg';
import FlagIconUS from '../../../assets/img/flags/flag_us.svg';
import FlagIconES from '../../../assets/img/flags/flag_es.svg';

export type DefaultProps = {
  children?: ReactNode;
  className?: string;
};

export type LanguageDataType = {
  languageId?: number;
  nation: LANGUAGE_CODE;
  name?: string;
  englishName?: string;
  level?: number | null | undefined;
  filterTag?: string;
};

export type locationTypes = {
  KR: LOCATION_CODE;
  JP: LOCATION_CODE;
  CN: LOCATION_CODE;
  US: LOCATION_CODE;
  ES: LOCATION_CODE;
};

export type locationIconTypes = {
  KR: string;
  JP: string;
  CN: string;
  US: string;
  ES: string;
};

export const LocationIcons: locationIconTypes = {
  KR: FlagIconKR,
  JP: FlagIconJP,
  CN: FlagIconCN,
  US: FlagIconUS,
  ES: FlagIconES,
};
