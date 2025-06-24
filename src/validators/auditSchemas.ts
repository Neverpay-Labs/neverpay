import Joi from 'joi';

/**
 * Schemas for validating queries against the audit trail.
 */
export const queryLogsSchema = Joi.object({
  level: Joi.string().valid('info', 'warn', 'error').optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).optional(),
  limit: Joi.number().integer().positive().max(100).default(50),
  offset: Joi.number().integer().min(0).default(0),
});