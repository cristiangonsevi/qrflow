import { Hono } from 'hono';
import { httpLogger, logger } from './src/uilts/logger';
import { keys } from './src/config/keys';

const app = new Hono();

logger.info({ myvar: keys.MYVAR });

app.use(httpLogger);

app.get('/', (c) => {
  return c.text('Hello, QRFlow!!');
});

export default {
  fetch: app.fetch,
  port: 4000,
};
