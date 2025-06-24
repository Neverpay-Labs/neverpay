import Joi from 'joi';

/**
 * Schemas for validating payment gateway configurations.
 */
export const gatewayConfigSchema = Joi.object({
  gatewayName: Joi.string().valid('Stripe', 'PayPal', 'Braintree').required(),
  credentials: Joi.object({
    apiKey: Joi.string().required(),
    apiSecret: Joi.string().required(),
  }).required(),
  isActive: Joi.boolean().default(true),
});

export const webhookPayloadSchema = Joi.object({
  eventId: Joi.string().required(),
  eventType: Joi.string().required(),
  payload: Joi.object().unknown(true).required(),
  signature: Joi.string().hex().required(),
});