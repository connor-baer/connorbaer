import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import securityHeaders from './lib/security-headers';
import logger from './lib/logger';

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Configuration
  server.enable('trust proxy');
  server.disable('x-powered-by');

  // Middlewares
  server.use(
    morgan(':method :url :status :response-time ms', {
      stream: logger.stream,
      skip: req => ['_next', 'static'].some(path => req.url.includes(path))
    })
  );
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(securityHeaders);

  // Static files
  // server.get('/robots.txt', robots);
  // server.get('/sitemap.xml', sitemap());

  // Dynamic pages
  server.get('/blog/:id', (req, res) =>
    app.render(req, res, '/blog/post', { id: req.params.id })
  );

  // Static pages
  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) {
      logger.error(err);
      throw err;
    }
    logger.info(`Server started on http://localhost:${port}`);
  });
});

export { app };
