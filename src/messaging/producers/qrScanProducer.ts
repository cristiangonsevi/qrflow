import type { MessageBroker } from '../interfaces/messageBroker';

export class QRScanProducer {
  constructor(private broker: MessageBroker) {}

  async publishQrScan(qrId: string, shortId: string): Promise<void> {
    await this.broker.publish('qr_scan', { qrId, shortId });
  }
}
