import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import styles from './FullPageModal.module.scss';
// TODO: 뒤로가기 버튼 & 닫기 버튼 리팩토링
// import { ReactComponent as PrevButtonIcon } from '../../../assets/img/prev_button.svg';
import { ReactComponent as CanceButtonlIcon } from '../../../assets/CancelIcon.svg';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

export type FullPageModalProps = {
  title?: string;
  labelSubmit?: string;
  labelClose?: string;
  onSubmit?: (...props: any) => void | undefined;
  onClose?: () => void | undefined;
  noFooter?: boolean;
  children?: ReactNode;
};

const FullPageModal = ({ children, ...props }: FullPageModalProps) => {
  return <FullPageChild {...props}>{children}</FullPageChild>;
};

const FullPageChild = ({
  title,
  onSubmit,
  onClose,
  labelSubmit = '확인',
  labelClose,
  noFooter,
  children,
}: FullPageModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onCloseHandler = () => {
    setIsModalOpen((prevState) => !prevState);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  useEffect(() => {
    setIsModalOpen(true);
    return () => {
      setIsModalOpen(false);
    };
  }, []);

  return createPortal(
    <div className={classNames(styles.modal, 'slideInUp')}>
      <button className={styles.dimmed} onClick={onCloseHandler} />
      <CSSTransition
        in={isModalOpen}
        timeout={3000}
        mountOnEnter
        unmountOnExit
        classNames="slideInUp"
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <Button
              size="sm"
              variant="default"
              onClick={onCloseHandler}
              icon={<CanceButtonlIcon />}
              iconBtn
            >
              {labelClose}
            </Button>
            <h2>{title}</h2>
          </div>
          <div className={styles.body}>{children}</div>
          {!noFooter && (
            <div className={styles.footer}>
              <ButtonGroup gap="md" wrap="nowrap">
                {labelClose && (
                  <Button size="lg" variant="secondary" onClick={onClose} full>
                    {labelClose}
                  </Button>
                )}
                {labelSubmit && (
                  <Button size="lg" variant="primary" onClick={onSubmit} full>
                    {labelSubmit}
                  </Button>
                )}
              </ButtonGroup>
            </div>
          )}
        </div>
      </CSSTransition>
    </div>,
    document.body
  );
};

export default FullPageModal;
