import type { MiddlewareHandler } from 'hono';
import { logger } from '../utils/logger';

const extractClientInfo: MiddlewareHandler = async (ctx, next) => {
  const ip =
    ctx.req.header('CF-Connecting-IP') ||
    ctx.req.header('X-Forwarded-For') ||
    ctx.req.header('X-Real-IP') ||
    'unknown';
  const userAgent = ctx.req.header('User-Agent') || 'Unknown';

  logger.info(`Client IP: ${ip}, User-Agent: ${userAgent}`);

  await next();
};

export { extractClientInfo };
