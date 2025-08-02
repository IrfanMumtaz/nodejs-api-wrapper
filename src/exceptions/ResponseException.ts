import BaseException from './BaseException';

// ResponseExceptionConfig interface removed as it was unused

class ResponseException extends BaseException {
  constructor(message: string = 'Data type mismatch', code: number = 500) {
    super(message, code, 500);
  }

  static dataTypeMismatch(msg?: string | null): ResponseException {
    return new ResponseException(msg || 'Data type mismatch');
  }
}

export default ResponseException;
