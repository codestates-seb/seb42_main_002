import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (callback: (page: number) => void, page: number) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        callback(page);
      }
    },
    [page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {});

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      observer.disconnect();
    };
  });

  return sentinelRef;
};

export default useInfiniteScroll;
