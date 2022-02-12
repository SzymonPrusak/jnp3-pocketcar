import express from 'express';
import mongoose from 'mongoose';
import { carRouter } from './routes/carRoutes';
import { accessRouter } from './routes/accessRoutes';

const mongooseLogin = 'root';
const mongoosePassword = 'password';
const mongooseUrl = '192.168.80.128:27017';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${mongooseLogin}:${mongoosePassword}@${mongooseUrl}`);

const db = mongoose.connection;

if (!db) {
  console.error('Error connecting to db');
} else {
  console.log('Db connected successfully');
}

app.use('/car', carRouter);
app.use('/access', accessRouter);

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.listen(3000);
