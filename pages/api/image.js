import url from 'url';

import sharp from 'sharp';
import { includes } from 'lodash/fp';
import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  try {
    const host = getHost(req);
    const protocol = getProtocol(req);
    const {
      query: { src, w, h, ratio, fm, fit = 'cover', bg: background = 'black' },
    } = url.parse(req.url, true);

    const acceptsWebp = includes('image/webp', req.headers.accept);
    const format = acceptsWebp ? 'webp' : fm;

    let transform = sharp();

    if (format) {
      const opts =
        format === 'jpeg' || format === 'png'
          ? { progressive: true }
          : undefined;
      transform = transform.toFormat(format, opts);
    }

    if (w || h) {
      const width = w && parseInt(w, 10);
      const height =
        (h && parseInt(h, 10)) ||
        (width && ratio && Math.round(width * (1 / ratio)));
      transform = transform.resize(width, height, { fit, background });
    }

    if (!src) {
      res.status(404).end();
      return;
    }

    const imageSrc = src.startsWith('/images/')
      ? url.format({ protocol, host, pathname: src })
      : src;

    const image = await fetch(imageSrc);

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
          return;
        }
        res.status(500).end();
      })
      .pipe(res);
  } catch (err) {
    res.status(500);

    if (process.env.NODE_ENV !== 'production') {
      res.send(err.message);
      return;
    }

    res.send('Internal Server Error');
  }
};

function getHost(req) {
  return req.headers.host;
}

function getProtocol(req) {
  return req.headers['x-forwarded-proto'] || 'http';
}
