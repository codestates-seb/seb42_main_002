import { ReactNode } from 'react';
import styles from './Guide.module.scss';

type GuideBoxProps = {
  children: ReactNode;
};

const GuideBox = ({ children }: GuideBoxProps) => {
  return <div className={styles.box}>{children}</div>;
};

export default GuideBox;
