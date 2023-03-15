import {Navigate, Outlet} from 'react-router-dom';
import classNames from 'classnames';
import {useAuth} from '../../context/AuthContext';
import BottomNav from './Nav/BottomNavBar';
import styles from './BaseLayout.module.scss';

type BaseLayouProps = {
  isAuth?: boolean;
  noTitle?: boolean;
};

const BaseLayout = ({ isAuth, noTitle }: BaseLayouProps): JSX.Element => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  return (
    <main
      className={classNames(styles.baselayout, { [styles.is_auth]: isAuth })}
    >
      <article
        className={classNames(styles.article, { [styles.noTitle]: noTitle })}
      >
        <Outlet />
      </article>
      {isAuth && <BottomNav />}
    </main>
  );
};

export default BaseLayout;
