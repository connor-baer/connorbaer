import React, { Children, cloneElement } from 'react';
import { isString, isEmpty } from 'lodash';
import Link from 'next/link';

export default function WrappedLink(props) {
  const { href, children, onClick } = props;

  if (isEmpty(children)) {
    return null;
  }

  const child = Children.only(children);

  if (isEmpty(href)) {
    return cloneElement(child, { onClick });
  }

  const as = isString(href) ? href : `${href.pathname}/${href.query.slug}`;
  return <Link {...props} as={as} passHref />;
}
