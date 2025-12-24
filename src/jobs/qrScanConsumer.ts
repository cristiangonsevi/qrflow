import type { MessageBroker } from '../messaging/interfaces/messageBroker';

export class QrScanConsumer {
  constructor(private broker: MessageBroker, private qrScanRepo: any) {}

  async start(): Promise<void> {
    await this.broker.subscribe('qr_scan', async (data: { qrId: string; shortId: string }) => {
      const { qrId, shortId } = data;
      // Lógica para procesar el escaneo del QR
      console.log(`QR escaneado: qrId=${qrId}, shortId=${shortId}`);
      // Aquí podrías interactuar con qrScanRepo para guardar el escaneo en la base de datos
    });
  }
}
