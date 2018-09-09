import path from 'path';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import securityHeaders from './lib/security-headers';
import logger from './lib/logger';

const SOURCE_DIR = './src';
const ABS_SOURCE_DIR = path.join(__dirname, '..', SOURCE_DIR);
const NEXT_DIR = './.next';
const STATIC_DIR = './static';

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: SOURCE_DIR });
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
      skip: req => ['_next', 'static'].some(p => req.url.includes(p))
    })
  );
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use(securityHeaders);

  // Service worker
  server.get('/service-worker.js', (req, res) => {
    const filePath = path.join(ABS_SOURCE_DIR, NEXT_DIR, '/service-worker.js');
    res.setHeader('Cache-Control', 'no-cache');
    app.serveStatic(req, res, filePath);
  });

  // Sitemap
  server.get('/sitemap.xml', (req, res) => {
    const filePath = path.join(ABS_SOURCE_DIR, STATIC_DIR, '/sitemap.xml');
    res.setHeader('Cache-Control', 'no-cache');
    app.serveStatic(req, res, filePath);
  });

  // Robots
  server.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    return res.send('User-agent: * \nDisallow:');
  });

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

export default app;
