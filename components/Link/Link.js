import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import NextLink from 'next/link';
import { sharedPropTypes } from '@madebyconnor/bamboo-ui';

export default function Link(props) {
  const { href, children, onClick } = props;

  if (isEmpty(children)) {
    return null;
  }

  const child = Children.only(children);

  if (isEmpty(href)) {
    return cloneElement(child, { onClick });
  }

  return <NextLink {...props} passHref />;
}

Link.propTypes = {
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: sharedPropTypes.childrenPropType,
  onClick: PropTypes.func
};
