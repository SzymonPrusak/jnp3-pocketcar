import Joi from 'joi';


const newCarBookSchema = Joi.object({
  licensePlate: Joi.string().required(),
  mileage: Joi.number().required(),
  nextServiceDate: Joi.string().required(),
  lastServiceMileage: Joi.number().required()
});

const newCarSchema = Joi.object({
  name: Joi.string().required(),
  productionYear: Joi.number().required(),
  generation: Joi.string().required(),
  engine: Joi.string().required(),
  carModelName: Joi.string().required(),
  makeName: Joi.string().required(),
  vinNumber: Joi.string().required(),
  book: newCarBookSchema.required()
});

export const validateNewCar = (car) => {
  return newCarSchema.validate(car);
}


const updateCarBookSchema = Joi.object({
  _id: Joi.string().required(),
  licensePlate: Joi.string().optional(),
  mileage: Joi.number().optional(),
  nextServiceDate: Joi.string().optional(),
  lastServiceMileage: Joi.number().optional()
});

const updateCarSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().optional(),
  productionYear: Joi.number().optional(),
  generation: Joi.string().optional(),
  engine: Joi.string().optional(),
  carModelName: Joi.string().optional(),
  makeName: Joi.string().optional(),
  vinNumber: Joi.string().optional(),
  book: updateCarBookSchema.optional()
});

export const validateCarUpdate = (car) => {
  return updateCarSchema.validate(car);
}
