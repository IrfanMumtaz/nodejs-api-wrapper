import { ExpressRequest, ExpressResponse, ExpressNextFunction } from './express';

export interface ControllerInterface {
  index(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void>;
  show(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void>;
  store(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void>;
  update(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void>;
  destroy(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void>;
}

export interface ControllerMethod {
  (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction): Promise<void> | void;
}

export interface ControllerRegistryInterface {
  register(name: string, controller: ControllerInterface): void;
  get(name: string): ControllerInterface | null;
}
