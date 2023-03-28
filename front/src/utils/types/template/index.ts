import LetterType0 from '../../../assets/img/letter_type/type_0.svg';
import LetterType1 from '../../../assets/img/letter_type/type_1.svg';
import LetterType2 from '../../../assets/img/letter_type/type_2.svg';
import LetterType3 from '../../../assets/img/letter_type/type_3.svg';

export type tempData = {
  url: string;
  options?: string;
  bgColor?: string;
};

export const TemplateType: tempData[] = [
  {
    url: LetterType0,
    options: '60 / 16px / 32px repeat',
    bgColor: '#ffffff',
  },
  {
    url: LetterType1,
    options: '106 / 18px / 32px repeat',
    bgColor: '#ffffff',
  },
  {
    url: LetterType2,
    options: '22 / 22px / 32px round',
    bgColor: '#ffffff',
  },
  {
    url: LetterType3,
    options: '56 / 34px / 32px stretch',
    bgColor: '#ffffff',
  },
];
