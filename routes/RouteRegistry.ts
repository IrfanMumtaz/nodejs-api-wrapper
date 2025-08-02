import { RouteConfig } from '../src/types';
import apiRouter from './api';
import webRouter from './web';

class RouteRegistry {
  static register(): RouteConfig[] {
    return [
      {
        path: '/',
        handler: webRouter,
      },
      {
        path: '/api',
        handler: apiRouter,
      },
    ];
  }
}

export default RouteRegistry;
