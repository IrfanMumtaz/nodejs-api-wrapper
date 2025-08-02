export type ServiceIdentifier = string | symbol;

export type ServiceFactory = () => unknown;

export type ServiceInstance = unknown;

export interface ContainerInterface {
  register<T>(name: string, instance: T): void;
  get<T>(name: string): T | null;
  has(name: string): boolean;
  remove(name: string): void;
  clear(): void;
}

export interface ServiceContainerInterface {
  register<T>(name: string, service: T): void;
  get<T>(name: string): T | null;
}
