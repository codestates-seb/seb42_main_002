import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';
import { useSetRecoilState } from 'recoil';
import { DefaultProps } from '../../utils';
import { userState } from '../../recoil/atoms';
import BottomNav from './Nav/BottomNavBar';
import PageTitle from '../Common/PageTitle/PageTitle';
import PrevButton from '../Common/PrevButton/PrevButton';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import styles from './BaseLayout.module.scss';

type BaseLayouProps = DefaultProps & {
  isAuth?: boolean;
  title?: string;
  subTitle?: string;
  noTitle?: boolean;
  isFirstLogin?: boolean;
};

const BaseLayout = ({
  isFirstLogin,
  title,
  subTitle,
  noTitle,
  children,
}: BaseLayouProps) => {
  const { getCurrentUserInfo } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setUserInfoProfile = useSetRecoilState(userState);

  const fetchUserInfo = useCallback(async () => {
    const userInfo = await getCurrentUserInfo();
    console.log(userInfo);
    if (userInfo === null) {
      navigate('/');
      return;
    }
    // TODO : 다른 방법 찾아보기
    if (userInfo) {
      if (userInfo.location) {
        return;
      }
      if (userInfo.location === null) {
        const pathArr = ['/start', '/welcome'];
        if (!pathArr.includes(pathname)) {
          navigate('/start', { replace: true });
        }
      }
      setUserInfoProfile(userInfo);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [children]);

  return (
    <main
      className={classNames(styles.baselayout, {
        [styles.has_bottom_nav]: !isFirstLogin,
      })}
    >
      <Header />
      <article
        className={classNames(styles.article, { [styles.noTitle]: noTitle })}
      >
        <div className="layout_container">
          {!noTitle && title && (
            <PageTitle
              title={title}
              translate={subTitle}
              prevIcon={<PrevButton />}
            />
          )}
          {children}
        </div>
      </article>
      {!isFirstLogin && <BottomNav />}
      <Footer />
    </main>
  );
};

export default BaseLayout;
