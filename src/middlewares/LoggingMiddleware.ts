import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../types';
import Logger from '@config/Logger';

export const requestLoggingMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
): void => {
  // Add start time to request
  req.startTime = Date.now();

  // Log incoming request
  Logger.info(
    `Request [${req.correlationId}]: ${req.method} ${req.url} - User-Agent: ${req.get('User-Agent')} - IP: ${req.ip}`
  );

  // Override res.end to log response
  const originalEnd = res.end;
  (res as any).end = function (chunk?: string | Buffer, encoding?: BufferEncoding): any {
    const duration = Date.now() - (req.startTime || 0);

    Logger.info(
      `Response [${req.correlationId}]: ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`
    );

    return originalEnd.call(this, chunk, encoding || 'utf8');
  };

  next();
};
