import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './BaseLayout.module.scss';

const NoneLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/main" />;
  return (
    <main className={styles.baselayout}>
      <article className={styles.article}>
        <Outlet />
      </article>
    </main>
  );
};

export default NoneLayout;
