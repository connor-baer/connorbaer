import React from 'react'
import { isString } from 'lodash'
import Link from 'next/link'

export default function WrappedLink(props) {
  const { href } = props
  const as = isString(href) ? href : `${href.pathname}/${href.query.slug}`
  return <Link {...props} as={as} passHref />
}
