const url = require('url');
const sharp = require('sharp');
const fetch = require('isomorphic-unfetch');
// const { includes } = require('lodash/fp');

const getHost = require('../utils/get-host');
const getProtocol = require('../utils/get-protocol');

module.exports = async (req, res) => {
  const host = getHost(req);
  const protocol = getProtocol(req);
  const {
    pathname,
    query: {
      src,
      w,
      h,
      ratio,
      fm: format,
      fit = 'cover',
      bg: background = 'black',
    },
  } = url.parse(req.url, true);

  // const acceptsWebp = includes('image/webp', req.headers.accept);
  // const format = acceptsWebp ? 'webp' : fm;

  let transform = sharp();

  if (format) {
    const opts =
      format === 'jpeg' || format === 'png' ? { progressive: true } : undefined;
    transform = transform.toFormat(format, opts);
  }

  if (w || h) {
    const width = w && parseInt(w, 10);
    const height =
      (h && parseInt(h, 10)) ||
      (width && ratio && Math.round(width * (1 / ratio)));
    transform = transform.resize(width, height, { fit, background });
  }

  const imagePathname = pathname && pathname.replace(/^\/static/, '');
  const imageUrl =
    imagePathname && imagePathname !== '/images/'
      ? url.format({ protocol, host, pathname: imagePathname })
      : src;

  if (!imageUrl) {
    res.status(404).end();
    return;
  }

  fetch(imageUrl).then((image) => {
    const contentType = format
      ? `image/${format}`
      : image.headers.get('content-type');

    res.setHeader('content-type', contentType);
    res.setHeader(
      'cache-control',
      'max-age=604800, s-maxage=3600, stale-while-revalidate',
    );

    image.body
      .pipe(transform)
      .on('error', (error) => {
        if (
          error.message === 'Input buffer contains unsupported image format'
        ) {
          res.status(404).end();
        }
        res.status(500).end();
      })
      .pipe(res);
  });
};
