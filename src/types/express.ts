import { NextFunction, Request, Response } from 'express';

export interface ExpressRequest extends Request {
  body: Record<string, unknown>;
  params: Record<string, string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
  correlationId?: string;
  startTime?: number;
}

export interface ExpressResponse extends Omit<Response, 'status' | 'json'> {
  status(code: number): ExpressResponse;
  json(data: Record<string, unknown>): ExpressResponse;
}

export type ExpressNextFunction = NextFunction;
