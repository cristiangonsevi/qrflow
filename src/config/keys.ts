import { logger } from '../utils/logger';
import zod from 'zod';

const validateEnv = zod.object({
  MYVAR: zod.coerce.number().min(1, 'MYVAR is required'),
  APP_PORT: zod.coerce.number().default(4000),
  REDIS_URL: zod.string().default('redis://localhost:6379'),
  MESSAGE_BROKER: zod.enum(['redis', 'kafka']).default('redis'),
});

type Keys = zod.infer<typeof validateEnv>;

let keys: Keys | null = null;

try {
  keys = validateEnv.parse(process.env);
} catch (error: any) {
  logger.error({ msg: error.message || 'Environment validation error' });
}

export { keys };
