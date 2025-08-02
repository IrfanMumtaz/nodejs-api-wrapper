import BaseResource from './BaseResource';

export interface IHomeResourceData {
  id: string | number;
  name: string;
}

class HomeResource extends BaseResource {
  static setData(data: IHomeResourceData) {
    return {
      id: data.id,
      name: data.name,
    };
  }
}

export default HomeResource;
