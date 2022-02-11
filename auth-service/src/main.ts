import auth from './middleware/auth';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './apiRoutes';
import { validateToken } from './utils/authentication';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://root:password@localhost:27017');

const db = mongoose.connection;

if (!db) {
  console.error('Error connecting to db');
} else {
  console.log('Db connected successfully');
}

app.use('/api', router);

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.get('/useApi', auth, (req, res) => {
  if (!validateToken(req.userToken)) {
    res.status(401);
    return;
  }
  res.send('Hello ' + req.userToken.login + ' ' + req.userToken.id);
});

app.listen(3000);
