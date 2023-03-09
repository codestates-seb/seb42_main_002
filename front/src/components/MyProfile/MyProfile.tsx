import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../../context/auth-context';
import useModals from '../../hooks/useModals';
import PageTitle from '../Common/PageTitle/PageTitle';
import MyProfileImage from './MyProfileImage';
import Button from '../Common/Button/Button';
import FullPageModal, {
  FullPageModalProps,
} from '../Common/Modal/FullPageModal';

import { ReactComponent as PrevButtonIcon } from '../../assets/img/prev_button.svg';
import styles from './MyProfile.module.scss';

const LocationEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      국가 수정 모달
    </FullPageModal>
  );
};

const LanguageEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      언어 추가 모달
    </FullPageModal>
  );
};

const TagEditModal = ({ onSubmit, onClose }: FullPageModalProps) => {
  return (
    <FullPageModal onSubmit={onSubmit} onClose={onClose} labelSubmit="수정">
      태그 수정 모달
    </FullPageModal>
  );
};

const MyProfile = () => {
  const { logout } = useAuth();
  const [isEditDisplayName, setIsEditDisplayName] = useState(false);
  const [isEdiitAboutMe, setIsEditAboutMe] = useState(false);
  const { openModal } = useModals();

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
        console.log('언어수정');
      },
    });
  };

  const onClickTagModalHandler = () => {
    openModal(TagEditModal, {
      onSubmit: () => {
        console.log('태그수정');
      },
    });
  };

  return (
    <div className={styles.container}>
      {/** TODO: 타이틀 공통 컴포넌트로 교체  */}
      <PageTitle
        title="Profile"
        translate="프로필"
        prevIcon={<PrevButtonIcon />}
      />
      {/** TODO:  공통 컴포넌트 작업하기   */}
      <div className={styles.contents}>
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
                      <p>록벨</p>
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
              <p>rockbell89@gmail.com</p>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="point">성별</label>
              <p>여자</p>
            </div>
            <div className={styles.input_container}>
              <label htmlFor="point">생년월일</label>
              <p>1989년 12월 24일</p>
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
                    <p>
                      안녕하세요! 한국에 살고 있고, kpop을 좋아하는 소녀입니다.
                      편지 주고받으면서 소통해요~!
                    </p>
                  </div>
                  <button onClick={clickChangeAboutMeHandler}>수정</button>
                </>
              )}
            </div>
          </div>
          <div className={styles.input_container}>
            <label htmlFor="language">언어</label>
            <div className={styles.tag_list}>
              <span className={styles.tags}>일본어 Lv.3</span>
              <span className={styles.tags}>영어 Lv.1</span>
              <Button
                size="sm"
                variant="dashed"
                onClick={onClickLangugeModalHandler}
              >
                + 언어추가
              </Button>
            </div>
          </div>
          <div className={styles.input_container}>
            <label htmlFor="language">태그</label>
            <div className={styles.tag_list}>
              <span className={styles.tags}>음악</span>
              <span className={styles.tags}>KPOP</span>
              <Button
                size="sm"
                variant="dashed"
                onClick={onClickTagModalHandler}
              >
                + 태그추가
              </Button>
            </div>
          </div>
        </section>
      </div>
      <div>
        <button onClick={logout}>로그아웃</button>
        <Link to="/guide">스타일 가이드</Link>
      </div>
    </div>
  );
};

export default MyProfile;
