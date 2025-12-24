import { Hono } from 'hono';
import { httpLogger, logger } from './src/utils/logger';
import { keys } from './src/config/keys';
import { extractClientInfo } from './src/middlewares/extractClientInfo ';
import { initializeApp, qrService } from './src/bootstrap';
import { qrRoutes } from './src/routes/qrRoutes';

const app = new Hono();

if (!keys) {
  logger.error('Invalid environment variables. Exiting application.');
  process.exit(1);
}

const appPort = keys.APP_PORT;
logger.info(`Starting server on port ${appPort}...`);

app.use(httpLogger);
app.use(extractClientInfo);

// Inicializa dependencias
await initializeApp();

// Configura rutas
app.route('/qr', qrRoutes);

Bun.serve({
  fetch: app.fetch,
  port: appPort,
});
