import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Label.module.scss';

type LabelProps = {
  to?: string; // 링크가 있는 경우
  isActive?: boolean;
  children?: ReactNode;
  className?: string;
  full?: boolean;
  onClick?: () => void;
};

const Label = ({ to, isActive, full, children }: LabelProps) => {
  const classNameValues = classNames(styles.label, {
    [styles.is_active]: isActive,
    [styles.full]: full,
  });

  if (to) {
    return (
      <Link to={to} className={classNameValues}>
        {children}
      </Link>
    );
  }
  return <span className={classNameValues}>{children}</span>;
};

export default Label;
