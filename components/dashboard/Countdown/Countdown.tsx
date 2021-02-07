import React from 'react';
import { Text } from '@madebyconnor/bamboo-ui';

import useTime from '../../../hooks/useTime';

const TEN_MINUTES = 10 * 60 * 1000;

export interface CountdownProps {
  title: string;
  date: Date;
}

export default function Countdown({ title, date, ...props }: CountdownProps) {
  const time = useTime(TEN_MINUTES);

  if (!time) {
    return null;
  }

  const msUntil = date.getTime() - time.now.getTime();
  const daysUntil = Math.ceil(msUntil / (1000 * 60 * 60 * 24));
  return (
    <Text {...props}>
      <Text weight="bold" as="strong">
        {daysUntil} days
      </Text>{' '}
      until{' '}
      <Text weight="bold" as="strong">
        {title}
      </Text>
    </Text>
  );
}
