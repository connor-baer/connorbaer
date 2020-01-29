import React from 'react';
import PropTypes from 'prop-types';
import { padCharsStart } from 'lodash/fp';

import useTime from '../../../hooks/use-time';

const pad = padCharsStart('0', 2);

export default function Clock({ showSeconds = true, ...rest }) {
  const time = useTime();

  if (!time) {
    return null;
  }

  let datetime = `${time.hours}:${pad(time.minutes)}`;

  if (showSeconds) {
    datetime += `:${pad(time.seconds)}`;
  }

  return (
    <time {...rest} dateTime={datetime}>
      {datetime}
    </time>
  );
}

Clock.propTypes = {
  showSeconds: PropTypes.bool
};
