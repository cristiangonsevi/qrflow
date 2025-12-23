import { logger } from '../uilts/logger';
import zod from 'zod';

const validateEnv = zod.object({
  MYVAR: zod.coerce.number().min(1, 'MYVAR is required'),
  APP_PORT: zod.coerce.number().default(4000),
});

type Keys = zod.infer<typeof validateEnv>;

let keys: Keys | null = null;

try {
  keys = validateEnv.parse(process.env);
} catch (error: any) {
  logger.error({ msg: error.message || 'Environment validation error' });
}

export { keys };
