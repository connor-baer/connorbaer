import React from 'react';
import { Prefooter } from '@madebyconnor/bamboo-ui';

import { SITE_TWITTER } from '../../constants';

export default function CustomPrefooter(props) {
  return (
    <Prefooter
      text={'Let’s be friends.'}
      linkLabel={'Say hi!'}
      linkUrl={`https://twitter.com/${SITE_TWITTER}`}
      {...props}
    />
  );
}
