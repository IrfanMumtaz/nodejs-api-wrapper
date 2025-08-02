import {
  ExpressRequest,
  ExpressResponse,
  ApiResponse,
  ExceptionConfig,
} from '../types';

class Controller {
  response(
    res: ExpressResponse,
    data: Record<string, unknown>,
    code: number = 200,
    message: string = 'Operation Successful'
  ): void {
    const response: ApiResponse = {
      data,
      error: {},
      success: true,
      message,
    };
    res.status(code).json(response as unknown as Record<string, unknown>);
  }

  error(
    res: ExpressResponse,
    error: ExceptionConfig,
    code: number = 500
  ): void {
    const response: ApiResponse = {
      data: {},
      error: {
        message: error.message,
        code: error.code || code,
      },
      success: false,
      message: error.message || 'Internal Server Error',
    };
    res.status(code).json(response as unknown as Record<string, unknown>);
  }

  async handleAsync(
    req: ExpressRequest,
    res: ExpressResponse,
    handler: (req: ExpressRequest, res: ExpressResponse) => Promise<void>
  ): Promise<void> {
    try {
      await handler(req, res);
    } catch (error) {
      const err = error as ExceptionConfig;
      this.error(res, err, err.status || 500);
    }
  }
}

export default Controller;
