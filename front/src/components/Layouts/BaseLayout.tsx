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
import { useRecoilState } from 'recoil';
import { IsModalOpen, IsIconOpen } from '../../recoil/atoms/Translate/index';

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
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getCurrentUserInfo } = useAuth();
  const setUserInfo = useSetRecoilState(userState);
  const [isModalOpen, setIsModalOpen] = useRecoilState(IsModalOpen);
  const [isIconOpen, setIsIconOpen] = useRecoilState(IsIconOpen);


  const fetchUserInfo = useCallback(async () => {
    const userInfo = await getCurrentUserInfo();
    if (userInfo === null) {
      navigate('/', { replace: true });
    }
    if (userInfo) {
      setUserInfo(userInfo);
      if (userInfo.location === null) {
        navigate('/start', { replace: true });
      }
      if (userInfo.location && pathname === '/start') {
        navigate('/main', { replace: true });
      }
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <main
      className={classNames(styles.baselayout, {
        [styles.has_bottom_nav]: !isFirstLogin,
      })}
      onClick={() => {
        if (isModalOpen) setIsModalOpen(false);
        if (isIconOpen) setIsIconOpen(false);
      }}
      role="presentation"
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
