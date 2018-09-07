import React from 'react';
import { SITE_NAME } from '../constants';

export function getMetaRobots(index = true, follow = true) {
  const indexString = index ? 'index' : 'noindex';
  const followString = follow ? 'follow' : 'nofollow';
  return <meta name="robots" content={`${indexString}, ${followString}`} />;
}

export function getTitle(title, siteName = SITE_NAME) {
  const titleParts = [];
  if (title) {
    titleParts.push(title);
  }
  if (siteName) {
    titleParts.push(siteName);
  }
  return <title>{titleParts.join(' · ')}</title>;
}
