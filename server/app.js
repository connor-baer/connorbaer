import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import logger from './lib/logger';
import routes from './lib/routes';

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.use(
    morgan(':method :url :status :response-time ms', {
      stream: logger.stream,
      skip: req => ['_next', 'static'].some(path => req.url.includes(path))
    })
  );
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  server.use(handler);

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) {
      logger.error(err);
      throw err;
    }
    logger.info(`Listening on http://localhost:${port}`);
  });
});

export { app };
