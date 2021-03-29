import React from 'react';
import { Text } from '@madebyconnor/bamboo-ui';

import useTime from '../../../hooks/useTime';

enum TimeUnit {
  'MINUTES' = 'minutes',
  'HOURS' = 'hours',
  'DAYS' = 'days',
}

const TEN_MINUTES = 10 * 60 * 1000;

const TIME_UNIT_FACTORS: {
  [key in TimeUnit]: number;
} = {
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  days: 1000 * 60 * 60 * 24,
};

function convertTime(time: number, unit: TimeUnit, roundUp = false) {
  const timeFactor = TIME_UNIT_FACTORS[unit];
  const convertedTime = Math.abs(time / timeFactor);
  return roundUp ? Math.ceil(convertedTime) : Math.floor(convertedTime);
}

function pluralize(string: string, number: number) {
  return number > 1 ? `${string}s` : string;
}

export interface CountdownProps {
  title: string;
  date: Date;
}

export default function Countdown({ title, date, ...props }: CountdownProps) {
  const time = useTime(TEN_MINUTES);

  if (!time) {
    return null;
  }

  const msDiff = date.getTime() - time.now.getTime();

  const betweenLabel = msDiff > 0 ? 'until' : 'since';
  let timeLabel: string;

  if (convertTime(msDiff, TimeUnit.MINUTES) < 60) {
    const minutes = convertTime(msDiff, TimeUnit.MINUTES);
    timeLabel = `${minutes} ${pluralize('minute', minutes)}`;
  } else if (convertTime(msDiff, TimeUnit.HOURS) < 24) {
    const hours = convertTime(msDiff, TimeUnit.HOURS);
    timeLabel = `${hours} ${pluralize('hour', hours)}`;
  } else {
    const days = convertTime(msDiff, TimeUnit.DAYS, msDiff > 0);
    timeLabel = `${days} ${pluralize('day', days)}`;
  }

  return (
    <Text {...props}>
      <Text weight="bold" as="strong">
        {timeLabel}
      </Text>{' '}
      {betweenLabel}{' '}
      <Text weight="bold" as="strong">
        {title}
      </Text>
    </Text>
  );
}
