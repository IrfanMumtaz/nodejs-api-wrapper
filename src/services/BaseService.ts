import { ValidationSchema } from '../types';
import Logger from '@config/Logger';
import ValidationException from '@exceptions/ValidationException';
import RouteException from '@exceptions/RouteException';
import { ObjectSchema, ValidationErrorItem } from 'joi';

class BaseService {
  protected logger: typeof Logger;

  constructor() {
    this.logger = Logger;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      this.logger.error(`Service error: ${(error as Error).message}`);
      throw error;
    }
  }

  validateData<T>(data: Record<string, unknown>, schema: ValidationSchema): T {
    // Check if schema is a Joi ObjectSchema
    if (schema && typeof (schema as ObjectSchema).validate === 'function') {
      const { error, value } = (schema as ObjectSchema).validate(data, {
        abortEarly: false,
      });
      if (error) {
        throw ValidationException.validation(
          error.details.map((e: ValidationErrorItem) => e.message).join(', ')
        );
      }
      return value as T;
    } else {
      throw ValidationException.validation('Invalid validation schema');
    }
  }

  handleNotFound(message: string = 'Resource not found'): never {
    throw RouteException.notFound(message);
  }

  handleUnauthorized(message: string = 'Unauthorized access'): never {
    throw RouteException.unauthorized(message);
  }
}

export default BaseService;
