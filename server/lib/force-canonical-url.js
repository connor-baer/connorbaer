import { format } from 'url';

const NEXT_URLS = ['/_next/', '/static/'];

export default function forceCanonicalUrl(req, res, next) {
  const { path, query } = req;

  const isNextUrl = NEXT_URLS.some(nextUrl => path.startsWith(nextUrl));
  const isCanonicalUrl = path === '/' || !path.endsWith('/');

  if (isNextUrl || isCanonicalUrl) {
    return next();
  }

  const status = req.method === 'POST' ? 308 : 301;
  return res.redirect(
    status,
    format({
      pathname: path.replace(/\/$/, ''),
      query
    })
  );
}
