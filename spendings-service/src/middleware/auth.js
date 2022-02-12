import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(403).send('Access denied.');

    const decoded = verify(token, 'aaaabbbbcccc');
    req.userToken = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
