import express from 'express';
import { sign } from 'jsonwebtoken';
import Joi from 'joi';
import { randomInt } from 'crypto';

import auth from './middleware/auth'


const app = express();

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.get('/login', (req, res) => {
  const login = req.query['login'];
  const password = req.query['password'];
  if (login != password) {
    res.send(401);
  }

  res.send(generateToken(login));
});

app.get('/useApi', auth, (req, res) => {
  if (!validateToken(req.userToken)) {
    res.status(401);
    return;
  }
  res.send('Hello ' + req.userToken.login + ' ' + req.userToken.id);
});

const generateToken = function(login) {
  const token = sign({ id: randomInt(1000), login: login}, 'aaaabbbbcccc');
  return token;
}

const validateToken = function(token) {
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required()
  });
  return schema.validate(token);
}

app.listen(3000);
