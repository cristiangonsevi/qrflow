import { Hono } from 'hono';
import { httpLogger, logger } from './src/utils/logger';
import { keys } from './src/config/keys';
import { extractClientInfo } from './src/middlewares/extractClientInfo ';
import { QRService } from './src/services/qrService';
import { QRScanProducer } from './src/messaging/producers/qrScanProducer';
import { createMessageBroker } from './src/config/messagingConfig';
import { QrScanConsumer } from './src/jobs/qrScanConsumer';

const app = new Hono();

if (!keys) {
  logger.error('Invalid environment variables. Exiting application.');
  process.exit(1);
}

app.use(httpLogger);
app.use(extractClientInfo);

export const messageBroker = createMessageBroker();

const qrScanProducer = new QRScanProducer(messageBroker);
const qrService = new QRService(qrScanProducer);

const qrScanConsumer = new QrScanConsumer(messageBroker, null);
qrScanConsumer.start();

app.get('/', (c) => {
  return c.text('Hello, QRFlow!!');
});

setTimeout(async () => {
  await qrService.processQRScan('abc123');
}, 5000);

const appPort = keys.APP_PORT;

logger.info(`Starting server on port ${appPort}...`);

Bun.serve({
  fetch: app.fetch,
  port: appPort,
});
