import classNames from 'classnames';
import { SIZES, SpinnerProps } from './Spinner';
import styles from './Spinner.module.scss';

const InnerSpinner = ({ size }: SpinnerProps) => {
  const classNameValue = classNames(styles.spinner, SIZES[size]);

  return (
    <div className={styles.inner_loading}>
      <div className={classNameValue}></div>
    </div>
  );
};

export default InnerSpinner;
