import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { sharedPropTypes } from '@sumup/circuit-ui';

import { imagePropType } from '../../utils/prop-types';
import { SITE_NAME, SITE_TWITTER } from '../../constants';

function constructTitle(title, siteName) {
  const titleParts = [];
  if (title) {
    titleParts.push(title);
  }
  if (siteName) {
    titleParts.push(siteName);
  }
  return titleParts.join(' · ');
}

function Meta({
  title,
  description,
  url,
  image,
  alt,
  index,
  follow,
  siteName,
  siteTwitter,
  children
}) {
  const titleString = constructTitle(title, siteName);
  const indexString = index ? 'index' : 'noindex';
  const followString = follow ? 'follow' : 'nofollow';
  const imageSrc = image
    ? image.src
    : // eslint-disable-next-line global-require
      require(`./fallback.jpg?resize&size=1200`);
  return (
    <Head>
      <title>{titleString}</title>
      <meta name="robots" content={`${indexString}, ${followString}`} />
      {description && <meta name="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imageSrc} />
      {alt && <meta name="twitter:image:alt" content={alt} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {siteTwitter && (
        <meta name="twitter:creator" content={`@${siteTwitter}`} />
      )}
      <meta
        name="twitter:card"
        content={image ? 'summary_large_image' : 'summary'}
      />
      {children}
    </Head>
  );
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
  image: PropTypes.shape(imagePropType),
  alt: PropTypes.string,
  index: PropTypes.bool,
  follow: PropTypes.bool,
  siteName: PropTypes.string,
  siteTwitter: PropTypes.string,
  children: sharedPropTypes.childrenPropType
};

Meta.defaultProps = {
  siteName: SITE_NAME,
  siteTwitter: SITE_TWITTER,
  index: true,
  follow: true,
  image: {}
};

/**
 * @component
 */
export default Meta;
