export interface IErrorResource {
  error?: Record<string, unknown>;
  message?: string;
  data?: Record<string, unknown>;
}

class ErrorResource {
  public data: Record<string, unknown>;
  public error: Record<string, unknown>;
  public success: boolean = false;
  public message: string;

  constructor({ error = {}, message = '', data = {} }: IErrorResource = {}) {
    this.data = data;
    this.error = error;
    this.success = false;
    this.message = message;
  }
}

export default ErrorResource;
