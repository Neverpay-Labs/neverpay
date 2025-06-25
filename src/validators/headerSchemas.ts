import Joi from 'joi';

/**
 * Schemas for validating incoming request headers.
 * Ensures that required headers like API keys are present.
 */
export const apiHeaderSchema = Joi.object({
  'x-api-key': Joi.string().required().description('The API key for authentication'),
  'x-request-id': Joi.string().uuid().optional().description('A unique ID for tracing the request'),
}).unknown(true); // Allows other headers to be present