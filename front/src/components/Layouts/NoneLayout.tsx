import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DefaultProps } from '../../utils';
import { getCookie } from '../../utils/cookie';
import styles from './BaseLayout.module.scss';

const NoneLayout = ({ children }: DefaultProps) => {
  const token = getCookie('accessJwtToken');
  if (token) return <Navigate to="/main" />;

  return (
    <main className={styles.baselayout}>
      <article className={styles.article}>
        <div className="layout_container">{children}</div>
      </article>
    </main>
  );
};

export default NoneLayout;
