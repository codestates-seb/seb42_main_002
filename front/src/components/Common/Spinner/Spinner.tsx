import classNames from 'classnames';
import { createPortal } from 'react-dom';
import styles from './Spinner.module.scss';

export type SizeType = 'sm' | 'md' | 'lg';
export type SizeTypes = {
  sm: string;
  md: string;
  lg: string;
};
export type SpinnerProps = {
  size: SizeType;
};

export const SIZES: SizeTypes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const Spinner = ({ size }: SpinnerProps) => {
  const classNameValue = classNames(styles.spinner, SIZES[size]);

  return createPortal(
    <div className={styles.loading}>
      <div className={classNameValue}></div>
    </div>,
    document.body
  );
};

export default Spinner;
