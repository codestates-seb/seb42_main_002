import classNames from 'classnames';
import { DefaultProps } from '../../../utils/types/common/common.type';
import styles from './Flex.module.scss';

type ColsProps = DefaultProps & {
  cols?: number;
  gap?: string;
  sm?: number;
  md?: number;
  lg?: number;
};

type RowProps = DefaultProps & {
  gap?: 'none' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'; // 버튼 그룹 가로 정렬
  align?: 'start' | 'center' | 'end'; // 버튼 그룹 세로 정렬
  wrap?: 'wrap' | 'nowrap';
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
  between: string;
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
  between: styles.h_between,
};

const FLEX_WRAP = {
  wrap: styles.wrap,
  nowrap: styles.nowrap,
};

const FlexColumn = ({ cols, gap, children }: ColsProps) => {
  const colWidth = cols && `calc(${(cols / 12) * 100}% - 0.25rem)`;

  return (
    <div className={classNames(styles.col)} style={{ width: colWidth }}>
      {children}
    </div>
  );
};

const FlexRow = ({
  gap = 'none',
  justify,
  align,
  wrap,
  children,
  className,
}: RowProps) => {
  return (
    <div
      className={classNames(
        styles.row,
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

const Flex = Object.assign(FlexRow, {
  Col: FlexColumn,
});

export default Flex;
