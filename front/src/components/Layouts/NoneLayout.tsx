import classNames from 'classnames';
import { Navigate } from 'react-router-dom';
import { DefaultProps } from '../../utils';
import { getCookie } from '../../utils/cookie';
import styles from './BaseLayout.module.scss';

const NoneLayout = ({ children }: DefaultProps) => {
  const token = getCookie('accessJwtToken');
  if (token) return <Navigate to="/main" />;

  return (
    <main className={classNames(styles.baselayout, styles.nonelayout)}>
      <article className={styles.article}>
        <div className="layout_container">{children}</div>
      </article>
    </main>
  );
};

export default NoneLayout;
