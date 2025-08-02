import BaseResource from './BaseResource';

export interface ISuccessResourceData {
  // Define properties as needed
  [key: string]: unknown;
}

class SuccessResource extends BaseResource {
  static setData(_data: ISuccessResourceData) {
    return {};
  }
}

export default SuccessResource;
