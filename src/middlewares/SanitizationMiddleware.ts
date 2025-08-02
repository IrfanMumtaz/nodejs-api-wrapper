import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../types';

export const sanitizationMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
): void => {
  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body) as Record<string, unknown>;
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query) as Record<
      string,
      string | string[] | undefined
    >;
  }

  // Sanitize URL parameters
  if (req.params) {
    req.params = sanitizeObject(req.params) as Record<string, string>;
  }

  next();
};

function sanitizeObject(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    sanitized[key] = sanitizeObject(value);
  }

  return sanitized;
}

function sanitizeString(value: unknown): unknown {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}
