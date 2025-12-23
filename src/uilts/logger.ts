import pino from 'pino';

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
  logger.info(`${ctx.req.method} ${ctx.req.url}`);
  await next();
};

export { logger, httpLogger };
