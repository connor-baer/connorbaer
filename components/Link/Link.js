import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isString } from 'lodash/fp';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import url from 'url';
import { propTypes } from '@madebyconnor/bamboo-ui';

function withPreview(urlObj = {}, preview) {
  const { query = {} } = urlObj;
  return preview ? { ...urlObj, query: { ...query, preview } } : urlObj;
}

export default function Link({ href, as, ...rest }) {
  const { query = {} } = useRouter();
  const { children, onClick } = rest;

  if (isEmpty(children)) {
    return null;
  }

  const child = Children.only(children);

  if (isEmpty(href)) {
    return cloneElement(child, { onClick });
  }

  const hrefObj = isString(href) ? url.parse(href) : href;
  const asObj = as ? url.parse(as) : hrefObj;
  const hrefWithPreview = withPreview(hrefObj, query.preview);
  const asWithPreview = withPreview(asObj, query.preview);
  const { protocol, pathname } = hrefObj;

  if (!pathname || protocol) {
    return cloneElement(child, { href, onClick });
  }

  return (
    <NextLink {...rest} href={hrefWithPreview} as={asWithPreview} passHref />
  );
}

Link.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  as: PropTypes.string,
  children: propTypes.childrenPropType,
  onClick: PropTypes.func,
};
