import Container from './Container';
import UserService from '@services/UserService';
import Logger from '@config/Logger';

class ServiceRegistry {
  static register(): void {
    // Register services with factories
    Container.register('UserService', () => new UserService());

    // Register singletons
    Container.registerSingleton('Logger', Logger);
  }

  static getService<T>(identifier: string): T {
    return Container.resolve<T>(identifier);
  }
}

export default ServiceRegistry;
