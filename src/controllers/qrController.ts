import { qrService } from '../bootstrap';
import type { MiddlewareHandler } from 'hono';

export const qrController = {
  scanQR: (async (c) => {
    try {
      const qrId = c.req.param('id');

      // Validación básica
      if (!qrId || typeof qrId !== 'string') {
        return c.json({ error: 'Invalid QR ID' }, 400);
      }

      // Llama al service para procesar
      await qrService.processQRScan(qrId);

      // Respuesta exitosa
      return c.json({ message: 'QR scanned successfully', qrId });
    } catch (error) {
      // Manejo de errores
      console.error('Error in scanQR:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  }) as MiddlewareHandler,
};
