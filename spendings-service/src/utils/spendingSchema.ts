import Joi from 'joi';

const newCarSchema = Joi.object({
  name: Joi.string().required(),
  cost: Joi.number().required(),
  carId: Joi.string().required(),
  date: Joi.date().required(),
  type: Joi.string().required(),
});

export const validateAddSpending = (spending) => {
  return newCarSchema.validate(spending);
}

const updateCarSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().optional(),
  cost: Joi.number().optional(),
  carId: Joi.string().optional(),
  date: Joi.date().optional(),
  type: Joi.string().optional(),
});

export const validateUpdateSpending = (spending) => {
  return updateCarSchema.validate(spending);
}
