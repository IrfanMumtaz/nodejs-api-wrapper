import ResponseException from '@exceptions/ResponseException';
import { Collection } from 'sutando';
import { ResourceData, ResourceCollection } from '../types';

class BaseResource {
  constructor(data: unknown) {
    if (data instanceof Array) {
      return this.dataArray(data) as unknown as BaseResource;
    } else if (data instanceof Collection) {
      return this.dataArray(data.toArray()) as unknown as BaseResource;
    } else if (data instanceof Object) {
      return this.dataObject(data) as unknown as BaseResource;
    } else {
      throw ResponseException.dataTypeMismatch(
        'This operation requires data type to be Object or Array.'
      );
    }
  }

  private dataArray(data: unknown[]): ResourceCollection | ResourceData[] {
    if ((this.constructor as any).wrap) {
      (this as any)[(this.constructor as any).wrap] = data.map(item =>
        (this.constructor as any).setData(item)
      );
      return this as unknown as ResourceCollection;
    } else {
      return data.map(item => (this.constructor as any).setData(item)) as ResourceData[];
    }
  }

  private dataObject(data: unknown): ResourceData | void {
    if ((this.constructor as any).wrap) {
      (this as any)[(this.constructor as any).wrap] = (
        this.constructor as any
      ).setData(data);
      return this as unknown as ResourceData;
    } else {
      return (this.constructor as any).setData(data) as ResourceData;
    }
  }
}

export default BaseResource;
