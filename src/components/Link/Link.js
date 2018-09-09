import React from 'react';
import Link from 'next/link';

export default function WrappedLink(props) {
  return <Link {...props} passHref />;
}
