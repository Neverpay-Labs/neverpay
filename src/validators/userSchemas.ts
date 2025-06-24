import Joi from 'joi';

/**
 * Schemas for validating user-related data.
 */
export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    }),
  fullName: Joi.string().max(100).required(),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email(),
  fullName: Joi.string().max(100),
}).min(1); // At least one field must be provided for an update