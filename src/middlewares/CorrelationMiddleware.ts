import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const correlationMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
): void => {
  // Generate correlation ID if not present
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();

  // Add correlation ID to request and response
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  // Add correlation ID to response locals for logging
  res.locals.correlationId = correlationId;

  next();
};
