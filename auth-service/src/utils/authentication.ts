import Joi from 'joi';
import { sign } from 'jsonwebtoken';

export const generateToken = function (id, login) {
  const token = sign({ id: id, login: login }, 'aaaabbbbcccc');
  return token;
};

export const validateToken = function (token) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });
  return schema.validate(token);
};
