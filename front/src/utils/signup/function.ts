export const emailValidation = (
  email: string
): { isErrorEmail: boolean; emailErrorText: string } | undefined => {
  if (!(email === undefined)) {
    if (
      !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        email
      )
    ) {
      return {
        isErrorEmail: true,
        emailErrorText: '유효하지 않은 이메일 입니다.',
      };
    } else {
      return { isErrorEmail: false, emailErrorText: '' };
    }
  }
  return undefined;
};

export const nameValidation = (
  name: string
): { isErrorName: boolean; nameErrorText: string } | undefined => {
  if (!(name === undefined)) {
    if (name.length < 2 || name.length > 10) {
      return {
        isErrorName: true,
        nameErrorText: '별명의 길이가 2이상 10 이하 이여야 합니다.',
      };
    } else if (!/^[\w가-힣]+$/i.test(name)) {
      return {
        isErrorName: true,
        nameErrorText: '한글, 영문, 숫자, 밑줄만 입력가능합니다.',
      };
    } else {
      return { isErrorName: false, nameErrorText: '' };
    }
  }
  return undefined;
};

export const genderValidation = (
  gender: boolean[]
): { isErrorGender: boolean; genderErrorText: string } | undefined => {
  if (!(gender === undefined)) {
    if (gender[0] === false && gender[1] === false && gender[2] === false) {
      return { isErrorGender: true, genderErrorText: '성별을 선택하세요.' };
    } else {
      return { isErrorGender: false, genderErrorText: '' };
    }
  }
  return undefined;
};

export const birthdayValidation = (
  birthday: string
): { isErrorBirthday: boolean; birthdayErrorText: string } | undefined => {
  if (!(birthday === undefined)) {
    if (birthday == '') {
      return {
        isErrorBirthday: true,
        birthdayErrorText: '생년월일을 입력하세요.',
      };
    }
    const regex = /^(\d{4,5})-/;
    const result = birthday.match(regex)?.[1];
    if (!(result === undefined)) {
      if (parseInt(result) > 2019) {
        return {
          isErrorBirthday: true,
          birthdayErrorText: '2020년생 이상은 가입할수 없습니다.',
        };
      }
      if (parseInt(result) <= 1900) {
        return {
          isErrorBirthday: true,
          birthdayErrorText: '1900년생 이하는 가입할수 없습니다.',
        };
      } else {
        return {
          isErrorBirthday: false,
          birthdayErrorText: '',
        };
      }
    }
  }
};

const specialCharacterRegex =
  /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;
export const passwordValidation = (
  password: string
): { isErrorPassword: boolean; passwordErrorText: string } | undefined => {
  if (!(password === undefined)) {
    if (password.length < 8 || password.length > 20) {
      return {
        isErrorPassword: true,
        passwordErrorText: PwWordErrorText,
      };
    }
    if (!specialCharacterRegex.test(password)) {
      return {
        isErrorPassword: true,
        passwordErrorText: PwWordimportErrorText,
      };
    } else {
      return {
        isErrorPassword: false,
        passwordErrorText: '',
      };
    }
  }
  return undefined;
};

export const passwordCheckValidation = (
  passwordCheck: string,
  password: string
):
  | { isErrorPasswordCheck: boolean; passwordCheckErrorText: string }
  | undefined => {
  if (!(passwordCheck === undefined)) {
    if (passwordCheck.length < 8 || passwordCheck.length > 20) {
      return {
        isErrorPasswordCheck: true,
        passwordCheckErrorText: PwWordErrorText,
      };
    }
    if (!specialCharacterRegex.test(password)) {
      return {
        isErrorPasswordCheck: true,
        passwordCheckErrorText: PwWordimportErrorText,
      };
    }
    if (!(passwordCheck === password)) {
      return {
        isErrorPasswordCheck: true,
        passwordCheckErrorText: '비밀번호와 일치하지 않습니다.',
      };
    } else {
      return {
        isErrorPasswordCheck: false,
        passwordCheckErrorText: '',
      };
    }
  }
  return undefined;
};

const PwWordErrorText = '8글자이상 20글자 이하만 사용 가능합니다.';
const PwWordimportErrorText = '영문, 특수문자가 포함되어야 합니다.';
