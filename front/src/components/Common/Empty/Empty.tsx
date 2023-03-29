import { ReactNode } from 'react';
import styles from './Empty.module.scss';

type EmptyProps = {
  title?: string;
  children?: ReactNode;
};

const Empty = ({ title, children }: EmptyProps) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default Empty;
