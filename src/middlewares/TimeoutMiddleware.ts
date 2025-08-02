import { ExpressRequest, ExpressResponse, ExpressNextFunction } from '../types';

export const timeoutMiddleware = (timeoutMs: number = 30000) => {
  return (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ): void => {
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({
          error: {
            message: 'Request timeout',
            code: 408,
          },
          success: false,
          message: 'Request timeout - the server took too long to respond',
        });
      }
    }, timeoutMs);

    // Clear timeout when response is sent
    res.on('finish', () => {
      clearTimeout(timeout);
    });

    res.on('close', () => {
      clearTimeout(timeout);
    });

    next();
  };
};
