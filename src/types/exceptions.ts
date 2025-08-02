export interface ExceptionConfig {
  message: string;
  code?: number;
  status?: number;
}

export interface ExceptionTypes {
  badRoute(message?: string): Error;
  notFound(message?: string): Error;
  unauthorized(message?: string): Error;
  forbidden(message?: string): Error;
  validation(errors: string[]): Error;
}
