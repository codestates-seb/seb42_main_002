import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  variant: 'default' | 'primary' | 'secondary' | 'danger' | 'dashed'; // 버튼 테마 색상 타입
  size: 'sm' | 'md' | 'lg'; // 버튼 사이즈
  color?: 'primary' | 'secondary' | 'danger'; // 텍스트 혹은 아이콘 색상 타입
  icon?: string | ReactNode; // 아이콘
  iconBtn?: boolean; // 아이콘 버튼 형태
  full?: boolean; // 버튼 넓이 100%
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  to?: string | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (
    e:
      | React.MouseEvent<Element, MouseEvent>
      | React.FormEvent<HTMLFormElement>
      | any
  ) => void;
};

type SizeTypes = {
  sm: string;
  md: string;
  lg: string;
};

type VariantTypes = {
  default: string;
  primary: string;
  secondary: string;
  danger: string;
  dashed: string;
};

type ColorTypes = {
  primary: string;
  secondary: string;
  danger: string;
};

const SIZES: SizeTypes = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const VARIANTS: VariantTypes = {
  default: styles.default,
  primary: styles.primary,
  secondary: styles.secondary,
  danger: styles.danger,
  dashed: styles.dashed,
};

const COLORS: ColorTypes = {
  primary: styles.text_primary,
  secondary: styles.text_secondary,
  danger: styles.text_danger,
};

const Button = ({
  type,
  variant = 'default',
  color,
  size = 'md',
  icon,
  iconBtn,
  full,
  children,
  className,
  disabled,
  to,
  onClick,
}: ButtonProps) => {
  const classNameValues = classNames(
    styles.btn,
    SIZES[size as keyof SizeTypes],
    VARIANTS[variant as keyof VariantTypes],
    COLORS[color as keyof ColorTypes],
    { [styles.is_full]: full },
    { [styles.is_icon]: icon },
    { [styles.is_disabled]: disabled },
    { [styles.is_icon_btn]: iconBtn },
    className
  );

  // 링크 기능을 하는 버튼 (to props를 사용했을 때)
  if (to) {
    return (
      <Link to={to} className={classNameValues}>
        {icon}
        {!iconBtn ? (
          <span>{children}</span>
        ) : (
          <span className="blind">{children}</span>
        )}
      </Link>
    );
  }

  // 이벤트 핸들러 기능을 하는 버튼  (onClick props를 사용했을 때)
  const EventButton = (
    <button
      type={type}
      className={classNameValues}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {!iconBtn ? (
        <span>{children}</span>
      ) : (
        <span className="blind">{children}</span>
      )}
    </button>
  );

  return EventButton;
};

export default Button;
