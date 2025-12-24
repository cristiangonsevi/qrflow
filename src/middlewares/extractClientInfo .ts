import type { MiddlewareHandler } from 'hono';
import { logger } from '../utils/logger';
import { QR_ID_REGEX } from '../utils/constants';
import { parseQrIdFromPath } from '../utils/qrUtils';

const extractClientInfo: MiddlewareHandler = async (ctx, next) => {
  const ip =
    ctx.req.header('CF-Connecting-IP') ||
    ctx.req.header('X-Forwarded-For') ||
    ctx.req.header('X-Real-IP') ||
    'unknown';
  const userAgent = ctx.req.header('User-Agent') || 'Unknown';

  const path = ctx.req.path;
  const method = ctx.req.method as 'GET' | 'POST' | 'PUT' | 'DELETE';
  const qrCodeId = parseQrIdFromPath(path, method);

  logger.info({
    msg: 'Client info extracted',
    ip,
    userAgent,
    qrCodeId,
  });

  await next();
};

export { extractClientInfo };
