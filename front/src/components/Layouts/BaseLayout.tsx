import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useAuth } from '../../context/AuthContext';
import BottomNav from './Nav/BottomNavBar';
import { DefaultProps } from '../../utils';
import PageTitle from '../Common/PageTitle/PageTitle';
import PrevButton from '../Common/PrevButton/PrevButton';
import Footer from './Footer/Footer';
import styles from './BaseLayout.module.scss';
import Header from './Header/Header';
import { getCookie } from '../../utils/cookie';
import { GET } from '../../utils/axios';

type BaseLayouProps = DefaultProps & {
  isAuth?: boolean;
  title?: string;
  subTitle?: string;
  noTitle?: boolean;
};

const BaseLayout = ({
  isAuth,
  title,
  subTitle,
  noTitle,
  children,
}: BaseLayouProps) => {
  const navigate = useNavigate();
  const token = getCookie('accessJwtToken');
  if (!token) return <Navigate to="/" />;

  return (
    <main
      className={classNames(styles.baselayout, { [styles.is_auth]: isAuth })}
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
      {isAuth && <BottomNav />}
      <Footer />
    </main>
  );
};

export default BaseLayout;
