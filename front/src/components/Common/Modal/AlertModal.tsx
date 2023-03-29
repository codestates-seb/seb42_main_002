import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import styles from './AlertModal.module.scss';

export type AlertModalProps = {
  title?: string;
  labelSubmit?: string;
  labelClose?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  hideSubmit?: boolean;
  hideClose?: boolean;
  children?: ReactNode;
};

const AlertModal = ({
  title,
  onSubmit,
  onClose,
  labelSubmit = '확인',
  labelClose = '닫기',
  hideSubmit,
  hideClose,
  children,
}: AlertModalProps) => {
  return createPortal(
    <div className={styles.modal}>
      <button className={styles.dimmed} onClick={onClose} />
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2>{title}</h2>
          </div>
        )}
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <ButtonGroup gap="sm" wrap="nowrap">
            {!hideClose && (
              <Button size="md" variant="secondary" onClick={onClose} full>
                {labelClose}
              </Button>
            )}
            {!hideSubmit && (
              <Button size="md" variant="primary" onClick={onSubmit} full>
                {labelSubmit}
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
