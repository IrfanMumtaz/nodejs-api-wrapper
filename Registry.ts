import { Application } from 'express';
import RouteRegistry from '@routes/RouteRegistry';
import ErrorRegistry from '@exceptions/ErrorRegistry';
import { RouteConfig } from './src/types';

class Registry {
  routes(app: Application): void {
    const routes = RouteRegistry.register();
    routes.forEach((route: RouteConfig) => {
      app.use(route.path, route.handler);
    });
  }

  errors(app: Application): void {
    const errors = ErrorRegistry.register();
    errors.forEach(error => {
      app.use(error);
    });
  }
}

export default new Registry();
