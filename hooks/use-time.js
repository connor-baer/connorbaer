import { useState } from 'react';

import useInterval from './use-interval';

const INITIAL_TIME = null;

function getTime() {
  const now = new Date();
  return {
    now,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export default function useTime(precision = 1000) {
  const [time, setTime] = useState(INITIAL_TIME);

  useInterval(() => {
    setTime(getTime());
  }, precision);

  return time;
}
