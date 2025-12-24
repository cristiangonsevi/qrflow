import type { QRScanProducer } from '../messaging/producers/qrScanProducer';

export class QRService {
  constructor(private qrScanProducer: QRScanProducer) {}
  async processQRScan(qrId: string) {
    await this.qrScanProducer.publishQrScan(qrId, 'shortId');
  }
}
