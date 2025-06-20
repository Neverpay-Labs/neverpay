import { Request, Response, NextFunction } from 'express';
import config from '../config';

/**
 * A simple API Key authentication middleware.
 */
export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const providedApiKey = req.header('x-api-key');

  if (!providedApiKey) {
    return res.status(401).json({ message: 'Unauthorized: API Key is missing.' });
  }

  if (providedApiKey !== config.apiKey) {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key.' });
  }

  next();
};