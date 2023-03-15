import classNames from 'classnames';
import { DefaultProps } from '../../../utils/types/common/common.type';
import styles from './Flex.module.scss';

type ColsProps = DefaultProps & {
  cols?: number;
  sm?: number;
  md?: number;
  lg?: number;
};

type RowProps = DefaultProps & {
  gap?: 'none' | 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'; // 버튼 그룹 가로 정렬
  align?: 'start' | 'center' | 'end'; // 버튼 그룹 세로 정렬
  wrap?: 'wrap' | 'nowrap';
  dir?: 'column' | 'row' | 'columnReverse' | 'rowReverse';
};

type alignTypes = {
  start?: string;
  center?: string;
  end?: string;
};

type justifyTypes = {
  start?: string;
  center?: string;
  end?: string;
  between?: string;
  around?: string;
  evenly?: string;
};

type wrapTypes = {
  wrap?: string;
  nowrap?: string;
};

type directTypes = {
  column?: string;
  row?: string;
  columnReverse?: string;
  rowReverse: string;
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
  around: styles.h_around,
  evenly: styles.h_evenly,
};

const FLEX_WRAP = {
  wrap: styles.wrap,
  nowrap: styles.nowrap,
};

const DIRECTIONS = {
  column: styles.column,
  columnReverse: styles.col_reverse,
  row: styles.row,
  rowReverse: styles.row_reverse,
};

const FlexColumn = ({ cols, children }: ColsProps) => {
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
  dir,
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
        DIRECTIONS[dir as keyof directTypes],
        className
      )}
    >
      {children}
    </div>
  );
};

const Flex = Object.assign(FlexRow, {
  Col: FlexColumn,
  Row: FlexRow,
});

export default Flex;
