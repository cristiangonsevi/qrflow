import { RedisClient } from 'bun';
import { keys } from './keys';

export const redis = new RedisClient(keys?.REDIS_URL);
