import BaseException from './BaseException';

// RouteExceptionConfig interface removed as it was unused

class RouteException extends BaseException {
  constructor(message: string = 'Route Exception', code: number = 400) {
    super(message, code, 400);
  }

  static badRoute(msg?: string | null): RouteException {
    return new RouteException(msg || 'Bad request, route does not exist');
  }

  static notFound(msg?: string | null): RouteException {
    const exception = new RouteException(msg || 'Resource not found', 404);
    exception.status = 404;
    return exception;
  }

  static unauthorized(msg?: string | null): RouteException {
    const exception = new RouteException(msg || 'Unauthorized access', 401);
    exception.status = 401;
    return exception;
  }

  static forbidden(msg?: string | null): RouteException {
    const exception = new RouteException(msg || 'Forbidden access', 403);
    exception.status = 403;
    return exception;
  }
}

export default RouteException;
