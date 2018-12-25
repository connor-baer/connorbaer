import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { sharedPropTypes } from '@sumup/circuit-ui'

import { SITE_NAME, SITE_TWITTER } from '../../constants'

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
  const titleParts = []
  if (title) {
    titleParts.push(title)
  }
  if (siteName) {
    titleParts.push(siteName)
  }
  const titleString = titleParts.join(' · ')
  const indexString = index ? 'index' : 'noindex'
  const followString = follow ? 'follow' : 'nofollow'
  return (
    <Head>
      <title>{titleString}</title>
      <meta name="robots" content={`${indexString}, ${followString}`} />
      {description && <meta name="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image.src} />}
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
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string
  }),
  alt: PropTypes.string,
  index: PropTypes.bool,
  follow: PropTypes.bool,
  siteName: PropTypes.string,
  siteTwitter: PropTypes.string,
  children: sharedPropTypes.childrenPropType
}

Meta.defaultProps = {
  siteName: SITE_NAME,
  siteTwitter: SITE_TWITTER,
  index: true,
  follow: true
}

/**
 * @component
 */
export default Meta
