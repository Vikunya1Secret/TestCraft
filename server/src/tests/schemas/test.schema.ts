import Joi from 'joi';

const baseSchema = {
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow(''),
  testTime: Joi.number().min(1),
  passingThreshold: Joi.number().min(0).max(100),
};

export const createTestSchema = Joi.object({
  ...baseSchema,
  title: baseSchema.title.required(),
});

export const updateTestSchema = Joi.object({
  ...baseSchema,
  isActive: Joi.boolean(),
}).min(1);