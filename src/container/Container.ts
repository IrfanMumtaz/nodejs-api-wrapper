import {
  ServiceIdentifier,
  ServiceFactory,
  ServiceInstance,
} from '../types/container';

class Container {
  private services: Map<ServiceIdentifier, ServiceInstance> = new Map();
  private factories: Map<ServiceIdentifier, ServiceFactory> = new Map();

  register(identifier: ServiceIdentifier, factory: ServiceFactory): void {
    this.factories.set(identifier, factory);
  }

  registerSingleton(
    identifier: ServiceIdentifier,
    instance: ServiceInstance
  ): void {
    this.services.set(identifier, instance);
  }

  resolve<T>(identifier: ServiceIdentifier): T {
    // Check if singleton instance exists
    if (this.services.has(identifier)) {
      return this.services.get(identifier) as T;
    }

    // Check if factory exists
    if (this.factories.has(identifier)) {
      const factory = this.factories.get(identifier)!;
      const instance = factory();
      this.services.set(identifier, instance); // Cache as singleton
      return instance as T;
    }

    throw new Error(`Service not registered: ${String(identifier)}`);
  }

  has(identifier: ServiceIdentifier): boolean {
    return this.services.has(identifier) || this.factories.has(identifier);
  }

  clear(): void {
    this.services.clear();
    this.factories.clear();
  }
}

export default new Container();
