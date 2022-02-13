import express from 'express';
import mongoose from 'mongoose';
import { router } from './apiRoutes';
import { hosts } from './const/hosts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${hosts.dbUsername}:${hosts.dbPassword}@${hosts.dbHost}`);
const db = mongoose.connection;

if (!db) {
  console.error('Error connecting to db');
} else {
  console.log('Db connected successfully');
}

app.use('/insurance', router)

app.get('/', (_, res) => {
  res.send('Server is up!');
});

app.listen(hosts.httpPort);
