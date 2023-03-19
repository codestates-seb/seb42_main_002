import { createPortal } from 'react-dom';
import styles from './Spinner.module.scss';

const Spinner = () => {
  return createPortal(
    <div className={styles.spinner}>Loading...</div>,
    document.body
  );
};

export default Spinner;
