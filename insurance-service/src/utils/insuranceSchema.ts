import Joi from "joi";

const insuranceAddSchema = Joi.object({
    insuranceNumber: Joi.string().required(),
    cost: Joi.number().required(),
    company: Joi.string().required(),
    scope: Joi.string().required(),
    contactNumber: Joi.number().required(),
    validFrom: Joi.date().required(),
    validUntil: Joi.date().required(),
    carId: Joi.string().required(),
  });
  
  export const validateAddInsurance = (insurance) => {
    return insuranceAddSchema.validate(insurance);
  }
  
  const insuranceUpdateSchema = Joi.object({
    _id: Joi.string().optional(),
    carId: Joi.string().required(),
    insuranceNumber: Joi.string().optional(),
    cost: Joi.number().optional(),
    company: Joi.string().optional(),
    scope: Joi.string().optional(),
    contactNumber: Joi.number().optional(),
    validFrom: Joi.date().optional(),
    validUntil: Joi.date().optional(),
  });

  export const validateUpdateInsurance = (insurance) => {
    return insuranceUpdateSchema.validate(insurance);
  }
