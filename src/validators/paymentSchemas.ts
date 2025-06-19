import Joi from 'joi';

export const observePaymentSchema = Joi.object({
  amount: Joi.number().positive().required(),
  creditor: Joi.string().min(3).max(100).required(),
  description: Joi.string().optional().max(255),
});

export const paymentIdSchema = Joi.object({
  id: Joi.string().pattern(/^req_\d+$/).required(),
});