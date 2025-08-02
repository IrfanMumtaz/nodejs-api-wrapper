import { ObjectSchema } from 'joi';

export type ValidationRule = (
  value: unknown,
  field: string,
  data: Record<string, unknown>
) => boolean | string;

export type ValidationSchema = ObjectSchema | Record<string, ValidationRule[]>;

export type ValidationResult = {
  isValid: boolean;
  errors: Record<string, string[]>;
};
