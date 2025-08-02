import BaseException from './BaseException';

// SampleExceptionConfig interface removed as it was unused

class SampleException extends BaseException {
  constructor(message: string = 'Testing', code: number = 422) {
    super(message, code, 400);
  }

  static sample(msg?: string | null): SampleException {
    return new SampleException(msg || 'Testing Exception');
  }
}

export default SampleException;
