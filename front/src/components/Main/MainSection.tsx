import {ReactNode} from 'react';
import styles from './MainSection.module.scss';

type MainSectionProps = {
  children: ReactNode;
};

const MainSection = ({ children }: MainSectionProps) => {
  return <section className={styles.section}>{children}</section>;
};

export default MainSection;
