import { format, getYear, Locale } from 'date-fns';

/**
 * @description Date를 시간으로 변환하는 함수
 */
export const formatDateToHour = (date: Date, locale: Locale): string => {
  const result = format(date, 'aa h:m ', { locale });
  return result;
};

/**
 * @description Date를 월/일로 변환하는 함수
 */
export const formatDateToMonth = (date: Date, locale: Locale): string => {
  return format(date, 'MMM do ', { locale });
};

/**
 * @description 나이를 반환하는 함수
 */
export const getAge = (date: Date): number => {
  return getYear(new Date()) - getYear(date) + 1;
};
