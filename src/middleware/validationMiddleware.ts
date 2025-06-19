import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validateRequest =
  (schema: Schema, property: 'body' | 'params' | 'query') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      // Pass a structured error to the central error handler
      const validationError = new Error(message) as any;
      validationError.statusCode = 400;
      validationError.isOperational = true;
      return next(validationError);
    }
    next();
  };