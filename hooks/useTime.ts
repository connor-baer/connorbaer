import { useState, useEffect } from 'react';

import useInterval from './useInterval';

const INITIAL_TIME = null;

export type Time = {
  now: Date;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTime(): Time {
  const now = new Date();
  return {
    now,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export default function useTime(precision = 1000): Time {
  const [time, setTime] = useState<Time>(INITIAL_TIME);

  useEffect(() => {
    setTime(getTime());
  }, []);

  useInterval(() => {
    setTime(getTime());
  }, precision);

  return time;
}
