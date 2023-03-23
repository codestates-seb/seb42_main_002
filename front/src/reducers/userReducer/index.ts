import { userData } from '../../dummy/userList';
import { profileUser } from '../../dummy/users';
import {
  GENDER_TYPE,
  LANGUAGE_CODE,
  LOCATION_CODE,
} from '../../utils/enums/common/common.enum';
import { TagDataType } from '../../utils/types/tags/tags';

const initialState = profileUser;

const userReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'GET_USERINFO':
      return { ...state, ...action.payload };
    // 언어 수정
    case 'ADD_LANGUAGE': {
      return {
        ...state,
        language: [...state.language, action.payload],
      };
    }
    case 'REMOVE_LANGUAGE': {
      return {
        ...state,
        language: state.language.filter(
          (lang: any) => lang.nation !== action.payload
        ),
      };
    }
    case 'SELECT_NATION': {
      return { ...state, selectedNationValue: action.payload };
    }
    // case 'SELECT_NATION': {
    //   return {
    //     ...state,
    //     selectedLanguage: {
    //       ...state.selectedLanguage,
    //       nation: action.payload,
    //     },
    //   };
    // }
    case 'CHANGE_LEVEL': {
      console.log('CHANGE_LEVEL', action.payload);
      return {
        ...state,
        language: state.language.map((lang: any) => {
          if (lang.nation === action.payload.nation) {
            return {
              ...lang,
              level: action.payload.level,
            };
          }
          return lang;
        }),
      };
    }
    case 'SELECT_LANGUAGE': {
      return {
        ...state,
        selectedLanguage: { ...state.selectedLevelLanguage, ...action.payload },
      };
    }
    // 태그 수정
    case 'ADD_TAG': {
      console.log(action.payload);
      return {
        ...state,
        tag: [...state.tag, action.payload],
      };
    }
    case 'REMOVE_TAG': {
      return {
        ...state,
        tag: state.tag.filter(
          (tag: TagDataType) => tag.tagId !== action.payload
        ),
      };
    }
    default:
      return state;
  }
};

export default userReducer;
