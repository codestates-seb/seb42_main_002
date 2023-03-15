import {ReactNode} from 'react';
import styles from './Guide.module.scss';

type GuideSectionProps = {
  children: ReactNode;
};

const GuideSection = ({ children }: GuideSectionProps) => {
  return <section className={styles.section}>{children}</section>;
};

export default GuideSection;
