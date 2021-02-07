import React from 'react';
import { padCharsStart } from 'lodash/fp';

import useTime from '../../../hooks/useTime';

const pad = padCharsStart('0', 2);

export interface ClockProps {
  showSeconds: boolean;
}

export default function Clock({ showSeconds = true, ...rest }: ClockProps) {
  const time = useTime();

  if (!time) {
    return null;
  }

  let datetime = `${time.hours.toString()}:${pad(time.minutes.toString())}`;

  if (showSeconds) {
    datetime += `:${pad(time.seconds.toString())}`;
  }

  return (
    <time {...rest} dateTime={datetime}>
      {datetime}
    </time>
  );
}
