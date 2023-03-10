import classNames from 'classnames';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Label.module.scss';

type LabelProps = {
  to?: string; // 링크가 있는 경우
  isActive?: boolean;
  children?: ReactNode;
};

const Label = ({ to, isActive, children }: LabelProps) => {
  if (to) {
    return <Link to={to}>{children}</Link>;
  }
  return (
    <span
      className={classNames(styles.label, { [styles.is_active]: isActive })}
    >
      {children}
    </span>
  );
};

export default Label;
