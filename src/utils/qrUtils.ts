import { QR_ID_REGEX } from './constants';

export function parseQrIdFromPath(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
): string | null {
  if (!path.startsWith('/qr/') || method !== 'GET') {
    return null;
  }
  const pathParts = path.split('/');
  const potentialId = pathParts[2] || null;
  return potentialId && QR_ID_REGEX.test(potentialId) ? potentialId : null;
}
