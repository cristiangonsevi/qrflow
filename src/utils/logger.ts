import pino from 'pino';
import { randomUUID } from 'crypto';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
});

const httpLogger = async (ctx: any, next: () => Promise<void>) => {
  const requestId = randomUUID();
  logger.info({
    msg: 'Incoming request',
    requestId,
    method: ctx.req.method,
    url: ctx.req.url,
  });
  await next();
};

export { logger, httpLogger };
