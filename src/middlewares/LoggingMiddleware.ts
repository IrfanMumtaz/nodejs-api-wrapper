import Logger from '@config/Logger';
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from '../types';

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
  (res as unknown as Record<string, unknown>).end = function (
    chunk?: string | Buffer,
    encoding?: BufferEncoding
  ): ExpressResponse {
    const duration = Date.now() - (req.startTime || 0);

    Logger.info(
      `Response [${req.correlationId}]: ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`
    );

    return originalEnd.call(this, chunk, encoding || 'utf8');
  };

  next();
};
