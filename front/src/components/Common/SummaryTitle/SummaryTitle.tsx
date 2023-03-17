import { DefaultProps } from '../../../utils';
import styles from './SummaryTitle.module.scss';

const SummaryTitle = ({ children }: DefaultProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{children}</h2>
    </div>
  );
};

export default SummaryTitle;
