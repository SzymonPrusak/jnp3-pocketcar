import express from 'express';
import mongoose from 'mongoose';
import { carRouter } from './routes/carRoutes';
import { accessRouter } from './routes/accessRoutes';
import { databaseHost, databaseUsername, databasePassword } from './const/database';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${databaseUsername}:${databasePassword}@${databaseHost}`);
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

app.listen(3002);
