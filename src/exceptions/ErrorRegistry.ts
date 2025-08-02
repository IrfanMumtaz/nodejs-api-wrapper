import Logger from '@config/Logger';
import RouteException from '@exceptions/RouteException';
import ErrorResource from '@resources/ErrorResource';
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from '../types';

class ErrorRegistry {
  static register(): Array<
    (
      err: Error,
      req: ExpressRequest,
      res: ExpressResponse,
      next: ExpressNextFunction
    ) => void
    > {
    return [this.badRoute, this.handle];
  }

  static handle(
    err: Error,
    req: ExpressRequest,
    res: ExpressResponse,
    _next: ExpressNextFunction
  ): void {
    const correlationId = req.correlationId || 'unknown';
    const errorContext = {
      correlationId,
      url: req.url,
      method: req.method,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      timestamp: new Date().toISOString(),
    };

    Logger.error(
      `Error [${correlationId}]: ${err.stack} - Context: ${JSON.stringify(errorContext)}`
    );

    const response = new ErrorResource({
      error: {
        stack:
          process.env.APP_ENV === 'production'
            ? 'Oops! Something went wrong.'
            : err.stack,
        code: (err as any).code || 500,
        correlationId,
      },
      message: err.message || 'Internal Server Error',
    });
    res.status((err as any).status || 500).json(response as any);
  }

  static badRoute(
    _err: Error,
    _req: ExpressRequest,
    _res: ExpressResponse,
    next: ExpressNextFunction
  ): void {
    next(RouteException.badRoute());
  }
}

export default ErrorRegistry;
