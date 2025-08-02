import BaseException from './BaseException';

// ValidationExceptionConfig interface removed as it was unused

class ValidationException extends BaseException {
  constructor(message: string = 'Validation Exception', code: number = 422) {
    super(message, code, 422);
  }

  static validation(msg?: string | null): ValidationException {
    return new ValidationException(msg || 'Validation Exception');
  }
}

export default ValidationException;
