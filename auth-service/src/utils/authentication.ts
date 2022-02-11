import Joi from 'joi';
import { randomInt } from 'crypto';
import { sign } from 'jsonwebtoken';

export const generateToken = function (login) {
  const token = sign({ id: randomInt(1000), login: login }, 'aaaabbbbcccc');
  return token;
};

export const validateToken = function (token) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  });
  return schema.validate(token);
};
