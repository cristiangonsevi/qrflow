import { Hono } from 'hono';
import { qrController } from '../controllers/qrController';

const qrRoutes = new Hono();

// Ruta para procesar scan de QR
qrRoutes.get('/:id', qrController.scanQR);

export { qrRoutes };
