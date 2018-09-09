import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { SITE_NAME } from '../../constants';

function Meta({ title, description, siteName, index, follow, children }) {
  const titleParts = [];
  if (title) {
    titleParts.push(title);
  }
  if (siteName) {
    titleParts.push(siteName);
  }
  const indexString = index ? 'index' : 'noindex';
  const followString = follow ? 'follow' : 'nofollow';
  return (
    <Head>
      <title>{titleParts.join(' · ')}</title>
      <meta name="robots" content={`${indexString}, ${followString}`} />
      <meta name="description" content={description} />
      {children}
    </Head>
  );
}

Meta.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  siteName: PropTypes.string,
  description: PropTypes.string,
  index: PropTypes.bool,
  follow: PropTypes.bool
};

Meta.defaultProps = {
  siteName: SITE_NAME,
  index: true,
  follow: true
};

/**
 * @component
 */
export default Meta;
