import Controller from './Controller';
import SampleException from '@exceptions/SampleException';
import HomeResource from '@resources/HomeResource';
import ServiceRegistry from '@container/ServiceRegistry';
import { ExpressRequest, ExpressResponse } from '../types';

class HomeController extends Controller {
  private userService: any;

  constructor() {
    super();
    this.userService = ServiceRegistry.getService('UserService');
  }

  async getCollectionResponse(
    _req: ExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    return this.handleAsync(
      _req,
      res,
      async (_req: ExpressRequest, res: ExpressResponse) => {
        const users = await this.userService.getAllUsers();
        return this.response(res, new HomeResource(users) as any);
      }
    );
  }

  async getSingleResponse(
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    return this.handleAsync(
      req,
      res,
      async (_req: ExpressRequest, res: ExpressResponse) => {
        const user = await this.userService.createUser(req.body);
        return this.response(
          res,
          new HomeResource(user) as any,
          201,
          'User created successfully'
        );
      }
    );
  }

  async getErrorResponse(
    req: ExpressRequest,
    res: ExpressResponse
  ): Promise<void> {
    return this.handleAsync(
      req,
      res,
      async (_req: ExpressRequest, _res: ExpressResponse) => {
        throw SampleException.sample('Test Exception');
      }
    );
  }
}

export default HomeController;
