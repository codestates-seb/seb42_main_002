import classNames from 'classnames';
import {ReactNode} from 'react';
import styles from './ButtonGroup.module.scss';

type ButtonGroupProps = {
  gap?: 'none' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end'; // 버튼 그룹 가로 정렬
  align?: 'start' | 'center' | 'end'; // 버튼 그룹 세로 정렬
  wrap?: 'wrap' | 'nowrap';
  children?: ReactNode;
  className?: string;
};

type alignTypes = {
  start: string;
  center: string;
  end: string;
};

type justifyTypes = {
  start: string;
  center: string;
  end: string;
};

type wrapTypes = {
  wrap: string;
  nowrap: string;
};

const GAP_SIZES = {
  none: styles.gap_none,
  sm: styles.gap_sm,
  md: styles.gap_md,
  lg: styles.gap_lg,
};

const ALIGN_ITMES = {
  start: styles.v_start,
  center: styles.v_center,
  end: styles.v_end,
};

const JUSTIFY_CONTENT = {
  start: styles.h_start,
  center: styles.h_center,
  end: styles.h_end,
};

const FLEX_WRAP = {
  wrap: styles.wrap,
  nowrap: styles.nowrap,
};

const ButtonGroup = ({
  gap = 'none',
  justify,
  align,
  children,
  wrap = 'wrap',
  className,
}: ButtonGroupProps) => {
  return (
    <div
      className={classNames(
        styles.btn_group,
        GAP_SIZES[gap],
        ALIGN_ITMES[align as keyof alignTypes],
        JUSTIFY_CONTENT[justify as keyof justifyTypes],
        FLEX_WRAP[wrap as keyof wrapTypes],
        className
      )}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;
