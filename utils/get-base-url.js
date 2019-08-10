import { format } from 'url';

import { isServer } from '@madebyconnor/bamboo-ui';

export default function getProtocol(ctx = {}) {
  if (!isServer) {
    return '';
  }

  const protocol = ctx.req.headers['x-forwarded-proto'];
  let { host } = ctx.req.headers;

  if (__DEV__) {
    // During local development, the forwarded port is wrong.
    host = host.replace('5000', '3000');
  }

  return format({ protocol, host });
}
