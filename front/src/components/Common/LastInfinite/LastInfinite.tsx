import React, { ForwardedRef } from 'react';
import styles from './LastInfinite.module.scss';

type LastInfiniteProps = {
  text?: string;
};

const LastInfinite = React.forwardRef(
  ({ text }: LastInfiniteProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={styles.last}>
        {text}
      </div>
    );
  }
);
LastInfinite.displayName = 'LastInfinite';
export default LastInfinite;
