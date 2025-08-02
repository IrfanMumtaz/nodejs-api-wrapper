import ValidationException from '@exceptions/ValidationException';
import {
  ExpressRequest,
  ExpressResponse,
  ExpressNextFunction,
  ValidationSchema,
} from '../types';
import { ObjectSchema, ValidationErrorItem } from 'joi';

class ValidationMiddleware {
  static validate(schema: ValidationSchema) {
    return (
      req: ExpressRequest,
      res: ExpressResponse,
      next: ExpressNextFunction
    ): void => {
      try {
        if (req.body === undefined) {
          throw ValidationException.validation('Missing or invalid fields');
        }

        // Check if schema is a Joi ObjectSchema
        if (schema && typeof (schema as ObjectSchema).validate === 'function') {
          const { error, value } = (schema as ObjectSchema).validate(req.body, { abortEarly: false });
          if (error) {
            throw ValidationException.validation(
              error.details.map((e: ValidationErrorItem) => e.message).join(', ')
            );
          }

          req.body = value;
        } else {
          // Handle custom validation schema
          throw ValidationException.validation('Invalid validation schema');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ValidationMiddleware;
