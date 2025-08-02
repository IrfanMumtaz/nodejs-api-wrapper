export interface ResourceInterface<T = Record<string, unknown>> {
  toArray(): T[];
  toJson(): Record<string, unknown>;
}

export interface ResourceCollectionInterface<T = Record<string, unknown>> {
  items: T[];
  toArray(): T[];
  toJson(): Record<string, unknown>;
}

export type ResourceData = Record<string, unknown>;
export type ResourceCollection = ResourceData[];
