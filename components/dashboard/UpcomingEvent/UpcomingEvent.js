import React, { useState, useEffect } from 'react';
import { first } from 'lodash/fp';
import { Text } from '@madebyconnor/bamboo-ui';
import { formatDistanceToNow, parseISO } from 'date-fns';

import useGoogle from '../../../hooks/use-google';

export default function UpcomingEvent() {
  const [event, setEvent] = useState();
  const {
    isInitialized,
    isAuthorized,
    signIn,
    client,
  } = useGoogle('https://www.googleapis.com/auth/calendar.readonly', [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ]);

  useEffect(() => {
    if (isInitialized && isAuthorized) {
      client.calendar.events
        .list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 1,
          orderBy: 'startTime',
        })
        .then((response) => {
          setEvent(first(response.result.items));
        });
    }
  }, [isInitialized, isAuthorized, client]);

  if (!isInitialized) {
    return null;
  }

  if (!isAuthorized) {
    return <button onClick={signIn}>Signin</button>;
  }

  if (!event) {
    return <span>Loading...</span>;
  }

  const startTime = event.start.dateTime || event.start.date;

  return (
    <div>
      <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
        {event.summary}
      </a>{' '}
      <Text as="span" slope="italic">
        in {formatDistanceToNow(parseISO(startTime))}
      </Text>
    </div>
  );
}
