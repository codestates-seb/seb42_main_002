import { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './LabelButton.module.scss';

type LabelButtonProps = {
  isActive?: boolean;
  full?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

const LabelButtonContent = ({ children }: LabelButtonProps) => {
  return <div className={styles.content}>{children}</div>;
};

const LabelButtonAction = ({ children }: LabelButtonProps) => {
  // 라벨 버튼 액션 버튼 영역
  return <div className={styles.action}>{children}</div>;
};

const LabelButtonItem = ({
  onClick,
  full,
  isActive,
  className,
  children,
}: LabelButtonProps) => {
  const classNameValues = classNames(
    styles.label_button,
    { [styles.is_active]: isActive },
    { [styles.is_full]: full },
    className
  );
  // 라벨 버튼 전체 이벤트
  if (onClick) {
    return (
      <button type="button" className={classNameValues} onClick={onClick}>
        {children}
      </button>
    );
  }
  // 라벨 버튼 텍스트
  return <div className={classNameValues}>{children}</div>;
};

const LabelButton = Object.assign(LabelButtonItem, {
  Content: LabelButtonContent,
  Action: LabelButtonAction,
});

export default LabelButton;
