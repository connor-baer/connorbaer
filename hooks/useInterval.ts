import { useEffect, useRef } from 'react';

// From https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// eslint-disable-next-line @typescript-eslint/ban-types
export default function useInterval<T extends Function>(
  callback: T,
  delay: number,
): void {
  const savedCallback = useRef<T>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [delay]);
}
