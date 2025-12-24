import { createMessageBroker } from './config/messagingConfig';
import { QRScanProducer } from './messaging/producers/qrScanProducer';
import { QRService } from './services/qrService';
import { QrScanConsumer } from './jobs/qrScanConsumer';

// Inicializa dependencias (composición root ligera)
export const messageBroker = createMessageBroker();
export const qrScanProducer = new QRScanProducer(messageBroker);
export const qrService = new QRService(qrScanProducer);
export const qrScanConsumer = new QrScanConsumer(messageBroker, null);

// Función para iniciar dependencias asíncronas
export const initializeApp = async () => {
  await messageBroker.connect();
  await qrScanConsumer.start();
};
