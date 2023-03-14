// enum에 const를 사용하는 경우 번들링 사이즈를 줄일 수 있지만, 표현식에서만 사용 할 수 있음
// enum을 배열로 활용하고 싶은경우 const를 제거하거나, 일반 객체로 다시 정의해야함
// 하지만 일반 객체로 정의할 경우 중복을 막지않아 중복된 값이 생성 될 수 있음

export enum GENDER_TYPE {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export const CONST_GENDER_TYPE = Object.values(GENDER_TYPE);

// 국가 코드
export const enum LOCATION_CODE {
  KR = 'KR',
  JP = 'JP',
  CN = 'CN',
  US = 'US',
  ES = 'ES',
}

// 언어 코드
export enum LANGUAGE_CODE {
  KO = 'KO',
  JA = 'JA',
  CN = 'CN',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  IT = 'IT',
  RU = 'RU',
  TR = 'TR',
  DE = 'DE',
}

export const CONST_LANGUAGE_CODE = Object.values(LANGUAGE_CODE);
