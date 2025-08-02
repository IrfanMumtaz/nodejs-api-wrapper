export interface BaseServiceInterface<T = Record<string, unknown>> {
  create(data: T): Promise<T>;
  findById(id: string | number): Promise<T | null>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
  findAll(): Promise<T[]>;
}

export interface ServiceRegistryInterface {
  register(name: string, service: BaseServiceInterface): void;
  get(name: string): BaseServiceInterface | null;
}

export interface ServiceContainerInterface {
  register<T extends BaseServiceInterface>(name: string, service: T): void;
  get<T extends BaseServiceInterface>(name: string): T | null;
}
