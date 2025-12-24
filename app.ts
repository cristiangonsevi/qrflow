import { Hono } from 'hono';
import { httpLogger, logger } from './src/utils/logger';
import { keys } from './src/config/keys';
import { extractClientInfo } from './src/middlewares/extractClientInfo ';

const app = new Hono();

if (!keys) {
  logger.error('Invalid environment variables. Exiting application.');
  process.exit(1);
}

app.use(httpLogger);
app.use(extractClientInfo);

app.get('/', (c) => {
  return c.text('Hello, QRFlow!!');
});

const appPort = keys.APP_PORT;

logger.info(`Starting server on port ${appPort}...`);

Bun.serve({
  fetch: app.fetch,
  port: appPort,
});
