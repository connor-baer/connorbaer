import url from 'url';

import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isString } from 'lodash/fp';
import NextLink from 'next/link';
import { propTypes } from '@madebyconnor/bamboo-ui';

export default function Link({ href, as, ...rest }) {
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
  const { protocol, pathname } = hrefObj;

  if (!pathname || protocol) {
    return cloneElement(child, { href, onClick });
  }

  return <NextLink {...rest} href={hrefObj} as={asObj} passHref />;
}

Link.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  as: PropTypes.string,
  children: propTypes.childrenPropType,
  onClick: PropTypes.func,
};
