import { differenceInMinutes, format, getYear, Locale, min } from 'date-fns';

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

/**
 * @description 편지 열람 가능한 시간 포맷 함수
 */
export const getLetterOpenTime = (date: Date, nation: string): string => {
  const time = differenceInMinutes(new Date(), date);
  const hour = Math.floor(time / 60);
  const minute = time % 60;
  // 문제: 언어별 처리를 어떻게 해야하는지 고민
  return `${hour}시간 ${minute}분후 도착`;
};
