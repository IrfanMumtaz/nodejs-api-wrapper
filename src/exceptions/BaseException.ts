// ExceptionConfig interface removed as it was unused

class BaseException extends Error {
  public code: number;
  public status: number;

  constructor(
    message: string = 'BaseException',
    code: number = 500,
    status: number = 500
  ) {
    super(message);
    this.name = 'Exception';
    this.code = code;
    this.status = status;
  }
}

export default BaseException;
