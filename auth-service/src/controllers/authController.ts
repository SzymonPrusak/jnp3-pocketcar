import { Request, Response } from 'express';
import { generateToken, validateToken } from '../utils/authentication';

import { User } from '../model/userModel';
import bcrypt from 'bcryptjs';

export class AuthController {
  public static login(req: Request, res: Response) {
    const { username, password } = req.body;

    User.findOne({ username }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      return res.status(200).send({
        id: user._id,
        username: user.username,
        token: generateToken(username),
      });
    });
  }

  public static register(req: Request, res: Response) {
    const { username, password, email } = req.body;

    const user = new User({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    user.save((err, user) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (!user) {
        return res.status(500).send({ message: 'Could not create user' });
      }

      return res.status(200).send({
        id: user._id,
        username: user.username,
        token: generateToken(username),
      });
    });
  }

  public static test(req: Request, res: Response) {
    if (!validateToken(req.userToken)) {
      res.status(401);
      return;
    }
    res.send('Hello ' + req.userToken.login + ' ' + req.userToken.id);
  }
}
