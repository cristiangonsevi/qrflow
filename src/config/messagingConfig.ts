import { RedisAdapter } from '../messaging/adapters/redisAdapter';
import type { MessageBroker } from '../messaging/interfaces/messageBroker';
import { keys } from './keys';

export const createMessageBroker = (): MessageBroker => {
  const brokerType = keys?.MESSAGE_BROKER;

  switch (brokerType) {
    case 'redis':
      return new RedisAdapter();

    case 'kafka':
      throw new Error('KafkaAdapter no está implementado aún');

    default:
      throw new Error(`Unsupported MESSAGE_BROKER type: ${brokerType}`);
  }
};
