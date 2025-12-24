import { redis } from '../../config/redis';
import type { MessageBroker } from '../interfaces/messageBroker';

export class RedisAdapter implements MessageBroker {
  private pubClient = redis;
  private subClient: any;

  async connect(): Promise<void> {
    this.subClient = await redis.duplicate();
    await Promise.all([this.pubClient.connect(), this.subClient.connect()]);
  }

  async publish(event: string, data: any): Promise<void> {
    console.log('Publishing event:', event, 'with data:', data);
    const message = JSON.stringify(data);
    await this.pubClient.publish(event, message);
  }

  async subscribe(event: string, handler: (data: any) => void): Promise<void> {
    console.log('Subscribing to event:', event);
    await this.subClient.subscribe(event, (message: string) => {
      const data = JSON.parse(message);
      handler(data);
    });
  }

  async close(): Promise<void> {
    await Promise.all([this.pubClient.close(), this.subClient.close()]);
  }
}
