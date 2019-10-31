import React from 'react';
import { Prefooter } from '@madebyconnor/bamboo-ui';

import { TWITTER } from '../../constants/site';

export default function CustomPrefooter(props) {
  return (
    <Prefooter
      text={'Let’s be friends.'}
      linkLabel={'Say hi!'}
      linkUrl={`https://twitter.com/${TWITTER}`}
      {...props}
    />
  );
}
