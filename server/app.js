import path from 'path';
import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import logger from './lib/logger';
import securityHeaders from './lib/security-headers';
import generateSitemap from './lib/generate-sitemap';
import asyncMiddleware from './lib/async-middleware';

const SOURCE_DIR = './src';
const ABS_SOURCE_DIR = path.join(__dirname, '..', SOURCE_DIR);
const NEXT_DIR = './.next';

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: SOURCE_DIR });
const handle = app.getRequestHandler();

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
  return app.serveStatic(req, res, filePath);
});

// Sitemap
server.get(
  '/sitemap.xml',
  asyncMiddleware(async (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const sitemap = await generateSitemap(baseUrl);
    res.setHeader('Cache-Control', 'no-cache');
    res.set('Content-Type', 'application/xml');
    return res.send(sitemap);
  })
);

// Robots
server.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  return res.send('User-agent: * \nDisallow:');
});

// Global error handler
// eslint-disable-next-line no-unused-vars
server.use(async (err, req, res, _) => {
  logger.error(err.stack);
  res.status(500);
  res.setHeader('Cache-Control', 'no-cache');
  return app.renderError(err, req, res, '/_error', {
    ...req.query,
    ...req.params
  });
});

// Dynamic pages
server.get('/blog/category/:slug', (req, res) =>
  app.render(req, res, '/blog/_category', { slug: req.params.slug })
);

// Static pages
server.get('*', (req, res) => handle(req, res));

server.listen(port, err => {
  if (err) {
    logger.error(err);
    throw err;
  }
  logger.info(`Server started on http://localhost:${port}`);
  app.prepare();
});

export default app;
