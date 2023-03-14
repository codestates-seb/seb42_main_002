import { useState } from 'react';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';
import useModals from '../../hooks/useModals';
import PageTitle from '../Common/PageTitle/PageTitle';
import MyProfileImage from './MyProfileImage';
import Button from '../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../Common/Modal/FullPageModal';
import { ReactComponent as PrevButtonIcon } from '../../assets/img/prev_button.svg';
import styles from './MyProfile.module.scss';
import LanguageEditModal from './LanguageEditModal/LanguageEditModal';
import Label from '../Common/Label/Label';
import { langTransformer } from '../../utils/common';
import TagEditModal from './TagEditModal/TagEditModal';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/user';
import { userTagState } from '../../recoil/atoms/userTag';
import { userLanguageState } from '../../recoil/atoms/userLanguage';
import ButtonGroup from '../Common/Button/ButtonGroup';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      국가 수정 모달
    </FullPageModal>
  );
};

const MyProfile = () => {
  const { logout } = useAuth();
  const [isEditDisplayName, setIsEditDisplayName] = useState(false);
  const [isEdiitAboutMe, setIsEditAboutMe] = useState(false);
  const { openModal } = useModals();
  const userInfo = useRecoilValue(userState);
  const userTags = useRecoilValue(userTagState);
  const userLanguages = useRecoilValue(userLanguageState);

  const clickChangeDisplayNameHandler = () => {
    setIsEditDisplayName((prevState) => !prevState);
  };

  const clickChangeAboutMeHandler = () => {
    setIsEditAboutMe((prevState) => !prevState);
  };

  const onClickLocationModalHandler = () => {
    openModal(LocationEditModal, {
      onSubmit: () => {
        console.log('국가 수정');
      },
    });
  };

  const onClickLangugeModalHandler = () => {
    openModal(LanguageEditModal, {
      onSubmit: () => {
        console.log('언어 수정');
      },
    });
  };

  const onClickTagModalHandler = () => {
    openModal(TagEditModal, {
      onSubmit: () => {
        console.log('태그 수정');
      },
    });
  };

  return (
    <div className={styles.container}>
      <PageTitle
        title="Profile"
        translate="프로필"
        prevIcon={<PrevButtonIcon />}
      />
      {/** TODO:  공통 컴포넌트 작업하기   */}
      <div className={styles.contents}>
        {userInfo && (
          <>
            <section className={styles.profile_base_info}>
              <MyProfileImage onChangeLocation={onClickLocationModalHandler} />
              <div className={styles.profile_info}>
                <div className={styles.input_container}>
                  <label htmlFor="displayName">별명</label>
                  <div className={styles.input_group}>
                    {isEditDisplayName ? (
                      <>
                        <div
                          className={classNames(
                            styles.field_wrapper,
                            styles.input_field
                          )}
                        >
                          <input id="displayName" />
                        </div>
                        <button onClick={clickChangeDisplayNameHandler}>
                          저장
                        </button>
                      </>
                    ) : (
                      <>
                        <div
                          className={classNames(
                            styles.field_wrapper,
                            styles.display_field
                          )}
                        >
                          <p>{userInfo.name}</p>
                        </div>
                        <button onClick={clickChangeDisplayNameHandler}>
                          수정
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="email">이메일</label>
                  <p>{userInfo.email}</p>
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="point">성별</label>
                  <p>{userInfo.gender}</p>
                </div>
                <div className={styles.input_container}>
                  <label htmlFor="point">생년월일</label>
                  <p>{userInfo.birthday}</p>
                </div>
              </div>
            </section>
            <section className={styles.profile_extra_info}>
              <div className={styles.input_container}>
                <label htmlFor="aboutMe">자기소개</label>
                <div className={styles.input_group}>
                  {isEdiitAboutMe ? (
                    <>
                      <div
                        className={classNames(
                          styles.field_wrapper,
                          styles.textarea_field
                        )}
                      >
                        <textarea id="aboutMe" />
                      </div>
                      <button onClick={clickChangeAboutMeHandler}>저장</button>
                    </>
                  ) : (
                    <>
                      <div
                        className={classNames(
                          styles.field_wrapper,
                          styles.display_field
                        )}
                      >
                        <p>{userInfo.introduce}</p>
                      </div>
                      <button onClick={clickChangeAboutMeHandler}>
                        {userInfo.introduce && userInfo.introduce.length > 0
                          ? '수정'
                          : '등록'}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="language">언어</label>
                <div className={styles.tag_list}>
                  <>
                    {userLanguages &&
                      userLanguages.map((language) => (
                        <Label key={language.nation}>
                          {langTransformer(language.nation)} Lv.{language.level}
                        </Label>
                      ))}
                    <Button
                      size="sm"
                      variant="dashed"
                      onClick={onClickLangugeModalHandler}
                    >
                      + 언어관리
                    </Button>
                  </>
                </div>
              </div>
              <div className={styles.input_container}>
                <label htmlFor="language">태그</label>
                <div className={styles.tag_list}>
                  <>
                    {userTags &&
                      userTags.map((tag) => (
                        <Label key={tag.id}>{tag.name}</Label>
                      ))}
                    <Button
                      size="sm"
                      variant="dashed"
                      onClick={onClickTagModalHandler}
                    >
                      + 태그관리
                    </Button>
                  </>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <ButtonGroup gap="sm" justify="end" className={styles.btns}>
        <Button variant="secondary" size="sm" to="/guide">
          스타일 가이드
        </Button>
        <Button variant="primary" size="sm" onClick={logout}>
          로그아웃
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default MyProfile;
