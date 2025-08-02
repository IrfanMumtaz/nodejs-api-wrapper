import { Request, Response, NextFunction } from 'express';

export interface ExpressRequest extends Request {
  body: Record<string, unknown>;
  params: Record<string, string>;
  query: any;
  correlationId?: string;
  startTime?: number;
}

export interface ExpressResponse extends Omit<Response, 'status' | 'json'> {
  status(code: number): ExpressResponse;
  json(data: Record<string, unknown>): ExpressResponse;
}

export type ExpressNextFunction = NextFunction;
