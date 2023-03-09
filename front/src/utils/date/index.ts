import { format, Locale } from 'date-fns';

/**
 * @description Date를 시간으로 변환하는 함수
 */
export const formatDateToHour = (date: Date, locale: Locale): string => {
  const result = format(date, 'aa h:m ', { locale });
  return result;
};
