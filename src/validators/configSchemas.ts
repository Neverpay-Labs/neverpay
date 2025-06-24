import Joi from 'joi';

/**
 * Schema for validating the application's configuration.
 * This helps prevent runtime errors due to misconfiguration.
 */
export const appConfigSchema = Joi.object({
  scheduler: Joi.object({
    checkIntervalMs: Joi.number().integer().positive().required(),
    vanishThresholdMs: Joi.number().integer().positive().required(),
  }).required(),
  
  server: Joi.object({
    port: Joi.number().port().required(),
    apiKey: Joi.string().required(),
  }).required(),
  
  database: Joi.object({
    connectionString: Joi.string().required(),
  }).required(),

  logging: Joi.object({
    level: Joi.string().valid('info', 'debug', 'warn', 'error').default('info'),
  }).required(),
});