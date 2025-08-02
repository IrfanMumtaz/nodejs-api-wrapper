import {
  ExpressRequest,
  ExpressResponse,
  ExpressNextFunction,
} from './express';

export interface MiddlewareFunction {
  (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction
  ): void | Promise<void>;
}
